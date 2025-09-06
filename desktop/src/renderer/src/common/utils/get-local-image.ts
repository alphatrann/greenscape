export const getLocalImage = (id: number) => {
  return `${import.meta.env.VITE_API_URL}/files/${id}`
}
