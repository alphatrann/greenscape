export function excludeNullSearchParams(searchParams: Record<string, string | null | undefined>) {
  for (const key in searchParams) {
    if (!searchParams[key]) {
      delete searchParams[key]
    }
  }
  return searchParams
}
