export const getShippingOption = (shippingCost: number) => {
  switch (shippingCost) {
    case 0:
      return "Free shipping";
    case 15:
      return "Next day air";
    default:
      return "Shipping option not found";
  }
};
