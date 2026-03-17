# Mouse-following colour ball code

This project’s mouse-following colour ball/fluid effect is implemented by:

- `src/components/FluidCursor.tsx` (mounts the canvas + starts the effect)
- `src/hooks/use-FluidCursor.tsx` (all pointer tracking + rendering/splat logic)
- `src/app/page.tsx` (injects `<FluidCursor />` into the page)

## 1) Component that starts the effect

**File:** `src/components/FluidCursor.tsx`

```tsx
'use client';
import { useEffect } from 'react';

import fluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-0">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
};
export default FluidCursor;
```

## 2) Where it is mounted on the page

**File:** `src/app/page.tsx`

```tsx
import FluidCursor from '@/components/FluidCursor';

// ...

return (
  <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
    {/* page content */}
    <FluidCursor />
  </div>
);
```

## 3) Pointer model + initialization

**File:** `src/hooks/use-FluidCursor.tsx`

```tsx
function pointerPrototype() {
  this.id = -1;
  this.texcoordX = 0;
  this.texcoordY = 0;
  this.prevTexcoordX = 0;
  this.prevTexcoordY = 0;
  this.deltaX = 0;
  this.deltaY = 0;
  this.down = false;
  this.moved = false;
  this.color = [0, 0, 0];
}

const pointers = [];
pointers.push(new pointerPrototype());
```

## 4) Render/update loop and “follow” trigger

**File:** `src/hooks/use-FluidCursor.tsx`

```tsx
function update() {
  const dt = calcDeltaTime();
  if (resizeCanvas()) initFramebuffers();
  updateColors(dt);
  applyInputs();
  step(dt);
  render(null);
  requestAnimationFrame(update);
}

function applyInputs() {
  pointers.forEach((p) => {
    if (p.moved) {
      p.moved = false;
      splatPointer(p);
    }
  });
}
```

## 5) Mouse listeners (core follow behavior)

**File:** `src/hooks/use-FluidCursor.tsx`

```tsx
window.addEventListener('mousedown', (e) => {
  let pointer = pointers[0];
  let posX = scaleByPixelRatio(e.clientX);
  let posY = scaleByPixelRatio(e.clientY);
  updatePointerDownData(pointer, -1, posX, posY);
  clickSplat(pointer);
});

document.body.addEventListener('mousemove', function handleFirstMouseMove(e) {
  let pointer = pointers[0];
  let posX = scaleByPixelRatio(e.clientX);
  let posY = scaleByPixelRatio(e.clientY);
  let color = generateColor();

  update();
  updatePointerMoveData(pointer, posX, posY, color);

  document.body.removeEventListener('mousemove', handleFirstMouseMove);
});

window.addEventListener('mousemove', (e) => {
  let pointer = pointers[0];
  let posX = scaleByPixelRatio(e.clientX);
  let posY = scaleByPixelRatio(e.clientY);
  let color = pointer.color;

  updatePointerMoveData(pointer, posX, posY, color);
});
```

## 6) Pointer movement -> fluid splat + colour

**File:** `src/hooks/use-FluidCursor.tsx`

```tsx
function updatePointerMoveData(pointer, posX, posY, color) {
  pointer.prevTexcoordX = pointer.texcoordX;
  pointer.prevTexcoordY = pointer.texcoordY;
  pointer.texcoordX = posX / canvas.width;
  pointer.texcoordY = 1.0 - posY / canvas.height;
  pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
  pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
  pointer.moved =
    Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
  pointer.color = color;
}

function splatPointer(pointer) {
  let dx = pointer.deltaX * config.SPLAT_FORCE;
  let dy = pointer.deltaY * config.SPLAT_FORCE;
  splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
}

function generateColor() {
  let c = HSVtoRGB(Math.random(), 1.0, 1.0);
  c.r *= 0.15;
  c.g *= 0.15;
  c.b *= 0.15;
  return c;
}
```
