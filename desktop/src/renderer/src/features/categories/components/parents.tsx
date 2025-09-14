import { Label } from '@renderer/features/ui/label'
import { useMemo } from 'react'
import { Category } from '../types'
import { generatePaths } from '../utils'

interface CategoryParentProps {
  parent: Category | null
}

export const CategoryParent = ({ parent }: CategoryParentProps) => {
  const directory = useMemo(() => {
    const paths = generatePaths(parent)
    return paths.map((p) => p.name).join('/')
  }, [parent])

  return (
    <div className="py-4">
      <div className="grid grid-cols-4 items-center">
        <Label className="flex-1">Parent</Label>

        <span className="col-span-3 w-full text-sm text-muted-foreground">{directory}</span>
      </div>
    </div>
  )
}
