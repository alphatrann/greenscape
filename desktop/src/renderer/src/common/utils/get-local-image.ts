export const getLocalImage = (id: number) => {
  return `${process.env.NEXT_PUBLIC_API_URL}/files/${id}`
}
