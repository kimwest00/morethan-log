import { NextApiRequest, NextApiResponse } from "next"
import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"
import getAllPageIds from "src/libs/utils/notion/getAllPageIds"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let id = CONFIG.notionConfig.pageId as string
    const api = new NotionAPI()
    const response = await api.getPage(id)
    id = idToUuid(id)

    const block = response.block
    const rawMetadata = block[id]?.value

    const collectionQuery = response.collection_query
    const firstCollection = Object.values(collectionQuery)[0] as any
    const firstViewId = Object.keys(firstCollection || {})[0]
    const firstViewData = firstCollection?.[firstViewId]

    const pageIds = getAllPageIds(response)

    res.json({
      pageType: rawMetadata?.type,
      collectionQueryKeys: Object.keys(collectionQuery || {}),
      firstViewId,
      firstViewDataKeys: Object.keys(firstViewData || {}),
      collection_group_results: firstViewData?.collection_group_results,
      blockIds_direct: firstViewData?.blockIds,
      pageIdsCount: pageIds.length,
      pageIds,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
