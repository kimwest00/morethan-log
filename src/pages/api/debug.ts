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
    const blockKeys = Object.keys(block).slice(0, 5)
    const targetBlock = block[uuidId]

    const val = (targetBlock as any)?.value
    res.json({
      uuidId,
      layer1Keys: Object.keys(targetBlock || {}),
      layer2Keys: Object.keys(val || {}),
      layer3Keys: Object.keys(val?.value || {}),
      typeAtLayer2: val?.type,
      typeAtLayer3: val?.value?.type,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
