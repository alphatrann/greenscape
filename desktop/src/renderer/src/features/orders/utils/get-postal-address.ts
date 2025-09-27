import { formatAddress } from 'localized-address-format'

interface Address {
  line1: string
  line2?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  customer?: string
}

export const getPostalAddress = ({
  line1,
  line2,
  city,
  state,
  postalCode,
  country,
  customer
}: Address) =>
  formatAddress({
    name: customer ?? undefined,
    postalCountry: country ?? undefined,
    postalCode: postalCode ?? undefined,
    administrativeArea: state ?? undefined,
    addressLines: line2 ? [line1, line2] : [line1],
    locality: city ?? undefined
  }).join('\n')
