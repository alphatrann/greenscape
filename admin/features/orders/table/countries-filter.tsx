"use client";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/features/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { Separator } from "@/features/ui/separator";
import { cn } from "@/lib/utils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { CheckIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { CountryGroup, Order } from "../types";
import { getCountryName } from "../utils";

interface CountriesFilterProps {
  countryGroups: CountryGroup[];
  table: Table<Order>;
}

const allowedCountries = ["US", "CA", "GB", "AU", "SG", "JP", "VN"];

export const CountriesFilter: React.FC<CountriesFilterProps> = ({
  countryGroups,
  table,
}) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const countries = searchParams.get("countries");
    if (!countries) setSelectedCountries([]);
    else setSelectedCountries(countries.split(","));
  }, [searchParams.get("countries")]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (selectedCountries.length > 0)
      currentQuery.countries = selectedCountries.join(",");
    else delete currentQuery.countries;
    table.resetPageIndex();
    const urlWithCountriesQuery = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithCountriesQuery);
  }, [selectedCountries, router]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Countries
          {selectedCountries.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedCountries.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedCountries.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedCountries.length} selected
                  </Badge>
                ) : (
                  allowedCountries
                    .filter((c) => selectedCountries.includes(c))
                    .map((c) => (
                      <Badge
                        variant="secondary"
                        key={c}
                        className="rounded-sm px-1 font-normal"
                      >
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
              {allowedCountries.map((c) => {
                const isSelected = selectedCountries.includes(c);
                return (
                  <CommandItem
                    key={c}
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedCountries(
                          selectedCountries.filter((sc) => sc !== c),
                        );
                      } else {
                        setSelectedCountries([...selectedCountries, c]);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{getCountryName(c)}</span>
                    {countryGroups.find((group) => group.country === c)
                      ?._count && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {
                          countryGroups.find((group) => group.country === c)
                            ?._count.id
                        }
                      </span>
                    )}
                  </CommandItem>
                );
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
  );
};
