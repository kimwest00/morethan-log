import { NextApiRequest, NextApiResponse } from "next"
import { getPosts } from "src/apis"
import { filterPosts } from "src/libs/utils/notion"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const posts = await getPosts()
    const filtered = filterPosts(posts)

    res.json({
      rawPostsCount: posts.length,
      filteredPostsCount: filtered.length,
      rawPosts: posts.map((p: any) => ({
        title: p.title,
        slug: p.slug,
        status: p.status,
        type: p.type,
        date: p.date,
        createdTime: p.createdTime,
      })),
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message, stack: err.stack })
  }
}
