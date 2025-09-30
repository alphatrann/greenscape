import { Badge } from '@renderer/features/ui/badge'
import { Button } from '@renderer/features/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@renderer/features/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/features/ui/popover'
import { Separator } from '@renderer/features/ui/separator'
import { cn } from '@renderer/lib/utils'
import { PlusCircleIcon } from 'lucide-react'
import { CheckIcon } from 'lucide-react'
import { CountryGroup } from '@renderer/../../common/types'
import { useOrderFiltersContext } from '../contexts/order-filters-context'
import { CountryFlag } from '../../../common/components/country-flag'
import { getCountryName } from '@renderer/../../common/utils'

interface CountriesFilterProps {
  countryGroups: CountryGroup[]
}

export const CountriesFilter: React.FC<CountriesFilterProps> = ({ countryGroups }) => {
  const { selectedCountries, setSelectedCountries } = useOrderFiltersContext()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed font-normal">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Countries
          {selectedCountries.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="space-x-1 flex">
                {selectedCountries.length > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedCountries.length} selected
                  </Badge>
                ) : (
                  selectedCountries.map((c) => (
                    <Badge variant="secondary" key={c} className="rounded-sm px-1 font-normal">
                      {getCountryName(c)}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search countries..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {countryGroups.map((c) => {
                const isSelected = selectedCountries.includes(c.country)
                return (
                  <CommandItem
                    key={c.country}
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedCountries(selectedCountries.filter((sc) => sc !== c.country))
                      } else {
                        setSelectedCountries([...selectedCountries, c.country])
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={'h-4 w-4 text-white'} />
                    </div>
                    <div className="flex items-center gap-x-3">
                      <CountryFlag code={c.country} />
                      <span>{getCountryName(c.country)}</span>
                    </div>
                    {c.count > 0 && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {c.count}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedCountries.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedCountries([])}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
