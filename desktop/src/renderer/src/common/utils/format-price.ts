export const formatPrice = (price: number, options?: { inCent: boolean }) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    !options?.inCent ? price : price / 100
  )
