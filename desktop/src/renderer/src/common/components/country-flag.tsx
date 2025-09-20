import { getCountryName } from '../../features/orders/utils'

interface CountryFlagProps {
  code: string
}

function getImageUrl(code: string) {
  const imgUrl = new URL(
    `../../../../../resources/flags/${code.toLowerCase()}.svg`,
    import.meta.url
  ).href
  return imgUrl
}

export const CountryFlag = ({ code }: CountryFlagProps) => {
  return (
    <img
      className="border border-accent"
      width={20}
      src={getImageUrl(code)}
      alt={getCountryName(code)}
    />
  )
}
