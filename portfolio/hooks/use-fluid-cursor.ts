type FluidPointer = {
  id: number
  texcoordX: number
  texcoordY: number
  prevTexcoordX: number
  prevTexcoordY: number
  deltaX: number
  deltaY: number
  down: boolean
  moved: boolean
  color: { r: number; g: number; b: number }
}

function pointerPrototype(): FluidPointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 255, g: 255, b: 255 },
  }
}

type Trail = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  life: number
  color: { r: number; g: number; b: number }
}

type JellyPoint = {
  angle: number
  baseRadius: number
  currentRadius: number
  velocity: number
}

type JellyBlob = {
  x: number
  y: number
  vx: number
  vy: number
  baseRadius: number
  hueOffset: number
  points: JellyPoint[]
}

function hsvToRgb(h: number, s: number, v: number) {
  let red = 0
  let green = 0
  let blue = 0
  const index = Math.floor(h * 6)
  const fraction = h * 6 - index
  const p = v * (1 - s)
  const q = v * (1 - fraction * s)
  const t = v * (1 - (1 - fraction) * s)

  switch (index % 6) {
    case 0:
      red = v
      green = t
      blue = p
      break
    case 1:
      red = q
      green = v
      blue = p
      break
    case 2:
      red = p
      green = v
      blue = t
      break
    case 3:
      red = p
      green = q
      blue = v
      break
    case 4:
      red = t
      green = p
      blue = v
      break
    case 5:
      red = v
      green = p
      blue = q
      break
  }

  return {
    r: Math.round(red * 255),
    g: Math.round(green * 255),
    b: Math.round(blue * 255),
  }
}

function generateColor() {
  const color = hsvToRgb(Math.random(), 1, 1)
  return {
    r: Math.round(color.r * 1),
    g: Math.round(color.g * 1),
    b: Math.round(color.b * 1),
  }
}

function generateHueColor(hue: number, alpha: number) {
  return `hsla(${hue}, 100%, 58%, ${alpha})`
}

export default function fluidCursor() {
  const canvas = document.getElementById("fluid") as HTMLCanvasElement | null
  if (!canvas) {
    return () => {}
  }

  const context = canvas.getContext("2d")
  if (!context) {
    return () => {}
  }

  const pointers: FluidPointer[] = [pointerPrototype()]
  const trails: Trail[] = []
  const blobs: JellyBlob[] = []
  let frameId = 0
  let isRunning = false
  let time = 0

  const scaleByPixelRatio = (input: number) => {
    const pixelRatio = window.devicePixelRatio || 1
    return Math.floor(input * pixelRatio)
  }

  const resizeCanvas = () => {
    const width = scaleByPixelRatio(window.innerWidth)
    const height = scaleByPixelRatio(window.innerHeight)
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      return true
    }
    return false
  }

  const createBlob = (radius: number, hueOffset: number): JellyBlob => {
    const pointCount = 160
    const points: JellyPoint[] = []

    for (let index = 0; index < pointCount; index += 1) {
      const angle = (Math.PI * 2 * index) / pointCount
      const variedRadius = radius * (0.9 + Math.random() * 0.2)
      points.push({
        angle,
        baseRadius: variedRadius,
        currentRadius: variedRadius,
        velocity: 0,
      })
    }

    return {
      x: canvas.width * 0.5,
      y: canvas.height * 0.5,
      vx: 0,
      vy: 0,
      baseRadius: radius,
      hueOffset,
      points,
    }
  }

  const updatePointerDownData = (pointer: FluidPointer, id: number, posX: number, posY: number) => {
    pointer.id = id
    pointer.down = true
    pointer.moved = false
    pointer.texcoordX = posX / canvas.width
    pointer.texcoordY = 1 - posY / canvas.height
    pointer.prevTexcoordX = pointer.texcoordX
    pointer.prevTexcoordY = pointer.texcoordY
    pointer.deltaX = 0
    pointer.deltaY = 0
    pointer.color = generateColor()
  }

  const updatePointerMoveData = (pointer: FluidPointer, posX: number, posY: number, color: { r: number; g: number; b: number }) => {
    pointer.prevTexcoordX = pointer.texcoordX
    pointer.prevTexcoordY = pointer.texcoordY
    pointer.texcoordX = posX / canvas.width
    pointer.texcoordY = 1 - posY / canvas.height
    pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX
    pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0
    pointer.color = color
  }

  const spawnTrail = (pointer: FluidPointer) => {
    const x = pointer.texcoordX * canvas.width
    const y = (1 - pointer.texcoordY) * canvas.height
    trails.push({
      x,
      y,
      vx: pointer.deltaX * canvas.width * 1.1,
      vy: -pointer.deltaY * canvas.height * 1.1,
      radius: 34,
      life: 1,
      color: pointer.color,
    })

    if (trails.length > 90) {
      trails.shift()
    }
  }

  const clickSplat = (pointer: FluidPointer) => {
    for (let count = 0; count < 10; count += 1) {
      const angle = (Math.PI * 2 * count) / 10
      const speed = 6 + Math.random() * 3
      trails.push({
        x: pointer.texcoordX * canvas.width,
        y: (1 - pointer.texcoordY) * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 28,
        life: 1,
        color: generateColor(),
      })
    }
  }

  const applyInputs = () => {
    pointers.forEach((pointer) => {
      if (pointer.moved) {
        pointer.moved = false
        spawnTrail(pointer)
      }
    })
  }

  const updateBlobPhysics = (pointer: FluidPointer) => {
    const targetX = pointer.texcoordX * canvas.width
    const targetY = (1 - pointer.texcoordY) * canvas.height
    const speed = Math.hypot(pointer.deltaX * canvas.width, pointer.deltaY * canvas.height)

    blobs.forEach((blob, blobIndex) => {
      const pull = blobIndex === 0 ? 0.048 : 0.041
      const damping = blobIndex === 0 ? 0.83 : 0.85

      const dx = targetX - blob.x
      const dy = targetY - blob.y
      blob.vx += dx * pull
      blob.vy += dy * pull
      blob.vx *= damping
      blob.vy *= damping
      blob.x += blob.vx
      blob.y += blob.vy

      blob.points.forEach((point, pointIndex) => {
        const wave = Math.sin(time * 0.004 + point.angle * 2.2 + blobIndex) * 4.6
        const ripple = Math.cos(time * 0.006 + pointIndex * 0.7 + blobIndex * 0.9) * 2.8
        const speedBoost = Math.min(speed * 0.09, 24)
        const targetRadius = point.baseRadius + wave + ripple + speedBoost
        point.velocity += (targetRadius - point.currentRadius) * 0.11
        point.velocity *= 0.84
        point.currentRadius += point.velocity
      })
    })
  }

  const drawJellyBlob = (blob: JellyBlob, layerIndex: number) => {
    const velocityStretchX = 1 + Math.min(Math.abs(blob.vx) / 32, 0.35)
    const velocityStretchY = 1 + Math.min(Math.abs(blob.vy) / 32, 0.35)
    const inverseStretchX = 2 - velocityStretchY
    const inverseStretchY = 2 - velocityStretchX

    const positions = blob.points.map((point) => ({
      x: blob.x + Math.cos(point.angle) * point.currentRadius * inverseStretchX,
      y: blob.y + Math.sin(point.angle) * point.currentRadius * inverseStretchY,
    }))

    if (positions.length < 3) {
      return
    }

    const hueBase = (time * 0.06 + blob.hueOffset) % 360
    const gradient = context.createLinearGradient(
      blob.x - blob.baseRadius,
      blob.y - blob.baseRadius,
      blob.x + blob.baseRadius,
      blob.y + blob.baseRadius
    )
    gradient.addColorStop(0, generateHueColor(hueBase, 0.66))
    gradient.addColorStop(0.45, generateHueColor((hueBase + 70) % 360, 0.58))
    gradient.addColorStop(1, generateHueColor((hueBase + 150) % 360, 0.64))

    context.save()
    context.globalCompositeOperation = "screen"
    context.filter = layerIndex === 0 ? "blur(1px)" : "blur(3px)"
    context.shadowBlur = layerIndex === 0 ? 42 : 54
    context.shadowColor = generateHueColor((hueBase + 35) % 360, 0.58)
    context.fillStyle = gradient

    context.beginPath()
    context.moveTo(positions[0].x, positions[0].y)
    for (let index = 0; index < positions.length; index += 1) {
      const current = positions[index]
      const next = positions[(index + 1) % positions.length]
      const controlX = (current.x + next.x) * 0.5
      const controlY = (current.y + next.y) * 0.5
      context.quadraticCurveTo(current.x, current.y, controlX, controlY)
    }
    context.closePath()
    context.fill()
    context.restore()
  }

  const render = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    blobs.forEach((blob, index) => {
      drawJellyBlob(blob, index)
    })

    for (let index = trails.length - 1; index >= 0; index -= 1) {
      const trail = trails[index]
      trail.x += trail.vx
      trail.y += trail.vy
      trail.vx *= 0.94
      trail.vy *= 0.94
      trail.life -= 0.018
      trail.radius *= 0.985

      if (trail.life <= 0.01 || trail.radius <= 1) {
        trails.splice(index, 1)
        continue
      }

      const alpha = Math.max(0, trail.life)
      const gradient = context.createRadialGradient(
        trail.x,
        trail.y,
        0,
        trail.x,
        trail.y,
        trail.radius
      )
      gradient.addColorStop(0, `rgba(${trail.color.r}, ${trail.color.g}, ${trail.color.b}, ${0.62 * alpha})`)
      gradient.addColorStop(1, `rgba(${trail.color.r}, ${trail.color.g}, ${trail.color.b}, 0)`)
      context.globalCompositeOperation = "lighter"
      context.fillStyle = gradient
      context.beginPath()
      context.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2)
      context.fill()
    }

    context.globalCompositeOperation = "source-over"
  }

  const update = () => {
    if (!isRunning) {
      return
    }

    resizeCanvas()
    applyInputs()
    updateBlobPhysics(pointers[0])
    render()
    time += 1
    frameId = window.requestAnimationFrame(update)
  }

  const onMouseDown = (event: MouseEvent) => {
    const pointer = pointers[0]
    const posX = scaleByPixelRatio(event.clientX)
    const posY = scaleByPixelRatio(event.clientY)
    updatePointerDownData(pointer, -1, posX, posY)
    clickSplat(pointer)
  }

  const onMouseMove = (event: MouseEvent) => {
    const pointer = pointers[0]
    const posX = scaleByPixelRatio(event.clientX)
    const posY = scaleByPixelRatio(event.clientY)
    const color = generateColor()
    updatePointerMoveData(pointer, posX, posY, color)
  }

  const onFirstMouseMove = (event: MouseEvent) => {
    const pointer = pointers[0]
    const posX = scaleByPixelRatio(event.clientX)
    const posY = scaleByPixelRatio(event.clientY)
    updatePointerMoveData(pointer, posX, posY, generateColor())
    document.body.removeEventListener("mousemove", onFirstMouseMove)
  }

  resizeCanvas()
  blobs.push(createBlob(92, 20))
  blobs.push(createBlob(76, 145))
  blobs.push(createBlob(58, 285))
  isRunning = true
  frameId = window.requestAnimationFrame(update)
  window.addEventListener("resize", resizeCanvas)
  window.addEventListener("mousedown", onMouseDown)
  window.addEventListener("mousemove", onMouseMove)
  document.body.addEventListener("mousemove", onFirstMouseMove)

  return () => {
    isRunning = false
    window.cancelAnimationFrame(frameId)
    window.removeEventListener("resize", resizeCanvas)
    window.removeEventListener("mousedown", onMouseDown)
    window.removeEventListener("mousemove", onMouseMove)
    document.body.removeEventListener("mousemove", onFirstMouseMove)
  }
}