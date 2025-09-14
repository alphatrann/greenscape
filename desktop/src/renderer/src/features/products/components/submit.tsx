import { Button } from '@renderer/features/ui/button'
import { cn } from '@renderer/lib/utils'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '@renderer/common/app-route'

interface ProductFormSubmitProps {
  className?: string
  loading: boolean
}
export const ProductFormSubmit = ({ className, loading }: ProductFormSubmitProps) => {
  const navigate = useNavigate()
  const onDiscard = async () => {
    navigate(AppRoute.Products)
  }
  return (
    <div className={cn('items-center gap-2', className)}>
      <Button disabled={loading} type="button" onClick={onDiscard} variant="outline" size="sm">
        Discard
      </Button>
      <Button disabled={loading} size="sm" type="submit">
        Save Product
      </Button>
    </div>
  )
}
