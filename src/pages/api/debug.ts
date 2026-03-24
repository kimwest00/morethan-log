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

    res.json({
      rawId,
      uuidId,
      blockKeyCount: Object.keys(block).length,
      targetBlockRole: targetBlock?.role,
      targetBlockValueKeys: Object.keys(targetBlock?.value || {}),
      targetBlockType: targetBlock?.value?.type,
      targetBlockParentTable: targetBlock?.value?.parent_table,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
