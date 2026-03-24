export function getBlockValue(block: any, id: string) {
  const b = block?.[id]
  if (!b) return undefined
  const v = b.value
  if (v && typeof v === "object" && "value" in v) return v.value
  return v
}
