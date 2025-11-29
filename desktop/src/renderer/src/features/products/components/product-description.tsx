'use client'
import { Label } from '@renderer/features/ui/label'

export const ProductDescription = ({ desc }: { desc: string }) => {
  return (
    <div className="mt-6">
      <Label>About this product</Label>
      <p className={'h-full whitespace-pre-wrap text-sm leading-[1.7142857] text-muted-foreground'}>
        {desc ?? 'No description provided for this product'}
      </p>
    </div>
  )
}
