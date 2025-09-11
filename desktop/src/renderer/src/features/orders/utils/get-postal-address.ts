import { formatAddress } from "localized-address-format";

interface Address {
  line1: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  customer?: string;
}

export const getPostalAddress = ({
  line1,
  line2,
  city,
  state,
  postalCode,
  country,
  customer,
}: Address) =>
  formatAddress({
    name: customer,
    postalCountry: country,
    postalCode,
    administrativeArea: state,
    addressLines: line2 ? [line1, line2] : [line1],
    locality: city,
  }).join("\n");
