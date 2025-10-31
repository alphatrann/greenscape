export const getLocalImage = (id?: string) => {
  if (!id) return ''
  return `${import.meta.env.VITE_API_URL}/files/${id}`
}
