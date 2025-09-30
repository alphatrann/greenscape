import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'
import { SalesByCountry } from '../../../../../common/types'
import mapFeatures from '../../../../../../resources/features.json'
import { formatPrice } from '../../../../../common/utils'

interface WorldMapProps {
  setTooltipContent: (content: string) => void
  setSelectedCountry: (country: string) => void
  data: SalesByCountry[]
  content: string
}

export const WorldMap = ({
  setTooltipContent,
  data,
  content,
  setSelectedCountry
}: WorldMapProps) => {
  const maxSales = Math.max(...data.map((d) => d.sales))
  const colorScale = scaleLinear()
    .domain([0, maxSales])
    // @ts-ignore
    .range(['hsl(140.6 84.2% 92.5%)', 'hsl(144.9 80.4% 10%)'])

  return (
    <ComposableMap>
      <Geographies geography={mapFeatures}>
        {({ geographies }) =>
          geographies.map((geo: { id: string; rsmKey: any; properties: { name: any } }) => {
            const d = data.find((s) => s.country === geo.id)

            return (
              <Geography
                key={geo.rsmKey}
                data-tooltip-id="world-map"
                data-tooltip-content={content}
                onMouseEnter={() => {
                  setTooltipContent(`${geo.properties.name}: ${formatPrice((d?.sales || 0) / 100)}`)
                  setSelectedCountry(d?.country ?? '')
                }}
                onMouseLeave={() => {
                  setTooltipContent('')
                  setSelectedCountry('')
                }}
                stroke="#fff"
                // @ts-ignore
                fill={d ? colorScale(d.sales) : 'hsl(140.6 84.2% 92.5%)'}
                geography={geo}
              />
            )
          })
        }
      </Geographies>
    </ComposableMap>
  )
}
