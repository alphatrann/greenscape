import { Button } from '@renderer/features/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/features/ui/dropdown-menu'
import { DownloadIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { getOrders } from '../../features/orders/api'
import { getShippingOption } from '../../features/orders/utils'
import { getProducts } from '../../features/products/api'
import { useFiltersContext } from '../contexts/filters-context'
import { DateRangeFilter } from '../data-table'

interface ExportButtonProps {
  entityType: 'products' | 'orders'
}

export const ExportButton = ({ entityType }: ExportButtonProps) => {
  const [exportFormat, setExportFormat] = useState('')
  const [from, setFrom] = useState<Date | undefined>(new Date())
  const [to, setTo] = useState<Date | undefined>(new Date())
  const { total } = useFiltersContext()

  const exportData = async () => {
    if (!exportFormat) return
    const queryString = `?limit=${total}`
    if (entityType === 'products') {
      const products = await getProducts(queryString)
      // @ts-ignore
      window.electronAPI.exportData({
        type: entityType,
        format: exportFormat,
        data: products
      })
      toast.success(`Exported ${products.length} products successfully!`)
    } else {
      if (!from || !to) return
      const { count, data } = await getOrders(
        `${queryString}&from=${from.toISOString()}&to=${to.toISOString()}`
      )
      // @ts-ignore

      window.electronAPI.exportData({
        type: entityType,
        from,
        to,
        format: exportFormat,
        data: data.map((d) => ({ ...d, shippingOption: getShippingOption(d.shippingCost) }))
      })

      toast.success(`Exported ${count} orders to ${exportFormat.toUpperCase()} successfully!`)
    }
  }

  const preventCloseOnSelect = (e: Event) => {
    e.preventDefault()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <DropdownMenuLabel>Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={exportFormat} onValueChange={setExportFormat}>
          <DropdownMenuRadioItem onSelect={preventCloseOnSelect} value="csv">
            CSV
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem onSelect={preventCloseOnSelect} value="xlsx">
            Excel
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem onSelect={preventCloseOnSelect} value="json">
            JSON
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        {entityType === 'orders' && (
          <>
            <DropdownMenuLabel>Date range</DropdownMenuLabel>
            <DateRangeFilter
              placeholder="Select date range"
              from={from}
              to={to}
              onFromChange={setFrom}
              onToChange={setTo}
            />
          </>
        )}

        {(entityType === 'products' || (from && to)) && exportFormat && (
          <>
            <DropdownMenuSeparator className="my-2" />
            <Button type="button" onClick={exportData} className="w-full">
              Export
            </Button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
