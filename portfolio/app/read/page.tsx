import { getAllArticlesMeta } from "@/lib/articles"
import ReadPageClient from "../../components/ReadPageClient"

export default async function ReadPage() {
  const articles = await getAllArticlesMeta()

  return <ReadPageClient articles={articles} />
}
