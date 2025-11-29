import { Button } from '../../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible'
import { CountryGroup } from '@renderer/../../common/types'
import { CountryFlag } from '../../../common/components'
import { formatPrice, getCountryName } from '@renderer/../../common/utils'
import { useState } from 'react'

interface CountryGroupsProps {
  countryGroups: CountryGroup[]
  selectedCountries: string[]
  sales: number
}

const CountryGroupItem = ({
  country,
  total,
  sales
}: {
  country: string
  total: number
  sales: number
}) => {
  return (
    <div key={country} className="flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <CountryFlag code={country} />
        <span className="text-sm font-medium text-foreground">{getCountryName(country)}</span>
        <span className="text-muted-foreground"> ({((total / sales) * 100).toFixed(1)}%)</span>
      </div>
      <span className="font-mono text-sm text-muted-foreground">
        {formatPrice(total, { inCent: true })}
      </span>
    </div>
  )
}

export const CountryGroups = ({ countryGroups, selectedCountries, sales }: CountryGroupsProps) => {
  const sortedGroups = [...countryGroups]
    .sort((a, b) => b.total - a.total)
    .filter(
      (g) =>
        g.total > 0 && (selectedCountries.length > 0 ? selectedCountries.includes(g.country) : true)
    )
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      {sortedGroups.slice(0, 3).map((group) => (
        <CountryGroupItem
          key={group.country}
          country={group.country}
          total={group.total}
          sales={sales}
        />
      ))}
      <CollapsibleContent>
        {sortedGroups.slice(3).map((group) => (
          <CountryGroupItem
            key={group.country}
            country={group.country}
            total={group.total}
            sales={sales}
          />
        ))}
      </CollapsibleContent>

      {sortedGroups.length > 3 && (
        <CollapsibleTrigger asChild>
          <Button className="-ml-3" variant="link" size="sm">
            {!isOpen ? 'Show more' : 'Show less'}
          </Button>
        </CollapsibleTrigger>
      )}
    </Collapsible>
  )
}
