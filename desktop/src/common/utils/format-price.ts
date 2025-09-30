export const formatPrice = (price: number, options?: { inCent: boolean }) => {
  if (isNaN(price)) return 'N/A'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    !options?.inCent ? price : price / 100
  )
}
