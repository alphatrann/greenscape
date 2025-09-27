import { Input } from '@renderer/features/ui/input'
import { cn } from '@renderer/lib/utils'

export const PriceInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-muted-foreground sm:text-sm">$</span>
      </div>
      <Input
        type="number"
        step={0.01}
        min={0.01}
        placeholder="19.99"
        {...props}
        className={cn('pl-7 text-gray-900', props.className)}
      />
    </div>
  )
}
