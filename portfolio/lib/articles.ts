import { promises as fs } from "fs"
import path from "path"

export type ArticleMeta = {
  slug: string
  title: string
  excerpt: string
  published: string
  readTime: string
}

export type Article = ArticleMeta & {
  content: string
}

const ARTICLES_DIRECTORY = path.join(process.cwd(), "content", "articles")

function parseFrontmatter(markdown: string) {
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!frontmatterMatch) {
    return {
      meta: {
        title: "Untitled",
        excerpt: "",
        published: "",
        readTime: "",
      },
      content: markdown,
    }
  }

  const [, frontmatterRaw, content] = frontmatterMatch
  const meta = {
    title: "Untitled",
    excerpt: "",
    published: "",
    readTime: "",
  }

  for (const line of frontmatterRaw.split("\n")) {
    const [rawKey, ...rest] = line.split(":")
    if (!rawKey || rest.length === 0) continue

    const key = rawKey.trim() as keyof typeof meta
    const value = rest.join(":").trim()

    if (key in meta) {
      meta[key] = value
    }
  }

  return { meta, content: content.trim() }
}

export async function getAllArticlesMeta(): Promise<ArticleMeta[]> {
  const fileNames = await fs.readdir(ARTICLES_DIRECTORY)

  const articles = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(ARTICLES_DIRECTORY, fileName)
        const raw = await fs.readFile(fullPath, "utf-8")
        const { meta } = parseFrontmatter(raw)

        return {
          slug,
          title: meta.title,
          excerpt: meta.excerpt,
          published: meta.published,
          readTime: meta.readTime,
        }
      })
  )

  return articles.sort((a, b) => b.published.localeCompare(a.published))
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(ARTICLES_DIRECTORY, `${slug}.md`)
    const raw = await fs.readFile(fullPath, "utf-8")
    const { meta, content } = parseFrontmatter(raw)

    return {
      slug,
      title: meta.title,
      excerpt: meta.excerpt,
      published: meta.published,
      readTime: meta.readTime,
      content,
    }
  } catch {
    return null
  }
}
