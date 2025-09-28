export const getLocalImage = (id: string) => {
  return `${import.meta.env.VITE_API_URL}/files/${id}`
}
