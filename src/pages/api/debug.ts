import { NextApiRequest, NextApiResponse } from "next"
import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rawId = CONFIG.notionConfig.pageId as string
    const api = new NotionAPI()
    const response = await api.getPage(rawId)
    const uuidId = idToUuid(rawId)

    const block = response.block
    const targetBlock = block[uuidId]
    const val = (targetBlock as any)?.value
    const valUnwrapped = val?.value ?? val

    const collectionRaw = Object.values(response.collection)[0]?.value as any
    const collection = collectionRaw?.value ?? collectionRaw

    const collectionQuery = response.collection_query
    const views = Object.values(collectionQuery)[0]
    const firstView = Object.values(views || {})[0] as any

    res.json({
      // block 구조
      blockValueKeys: Object.keys(val || {}),
      blockValueIsNested: !!(val?.value),
      rawMetadataType: valUnwrapped?.type,

      // collection 구조
      collectionRawKeys: Object.keys(collectionRaw || {}),
      collectionIsNested: !!(collectionRaw?.value),
      schemaExists: !!collection?.schema,
      schemaKeyCount: Object.keys(collection?.schema || {}).length,

      // collection_query 구조
      firstViewKeys: Object.keys(firstView || {}),
      hasCollectionGroupResults: !!firstView?.collection_group_results,
      hasDirectBlockIds: !!firstView?.blockIds,
      collectionGroupResultsCount: firstView?.collection_group_results?.blockIds?.length ?? 0,
      directBlockIdsCount: firstView?.blockIds?.length ?? 0,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message, stack: err.stack })
  }
}
