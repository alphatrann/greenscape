import { Label } from '@renderer/features/ui/label'
import { useMemo } from 'react'
import { Category } from '../types'
import { generatePaths } from '../utils'

interface CategoryParentsProps {
  parents: Category | null
}

export const CategoryParents = ({ parents }: CategoryParentsProps) => {
  const directory = useMemo(() => {
    const paths = generatePaths(parents)
    return paths.map((p) => p.name).join('/')
  }, [parents])

  return (
    <div className="py-4">
      <div className="grid grid-cols-4 items-center">
        <Label className="flex-1">Parents</Label>

        <span className="col-span-3 w-full text-sm text-muted-foreground">{directory + '/'}</span>
      </div>
    </div>
  )
}
