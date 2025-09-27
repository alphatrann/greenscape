export const getLocalImage = (id: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}/files/${id}`;
};
