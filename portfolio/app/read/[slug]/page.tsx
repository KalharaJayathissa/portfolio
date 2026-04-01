import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { getAllArticlesMeta, getArticleBySlug } from "@/lib/articles"

type PageParams = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticlesMeta()
  return articles.map((article) => ({ slug: article.slug }))
}

export default async function ArticlePage({ params }: PageParams) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 py-10 md:py-14">
      <article className="max-w-3xl mx-auto">
        <Link href="/read" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm tracking-wider mb-8 transition-all duration-150 active:scale-95">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO READ
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-400 mb-3 tracking-wide">
            <span>{article.published}</span>
            <span className="text-green-500">•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">{article.title}</h1>
          <p className="text-gray-300 mt-4 text-sm sm:text-base leading-relaxed">{article.excerpt}</p>
        </div>

        <div className="h-px w-full bg-green-500/20 mb-8" />

        <div className="max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-white">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-white">{children}</h3>,
              p: ({ children }) => <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-gray-200 mb-4 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="text-sm sm:text-base leading-relaxed">{children}</li>,
              a: ({ href, children }) => (
                <a href={href} className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-all duration-150 active:scale-95 inline-block" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-green-500/40 pl-4 text-gray-300 italic mb-4">{children}</blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-gray-900 border border-green-500/20 px-1.5 py-0.5 rounded text-green-300 text-xs sm:text-sm">{children}</code>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
