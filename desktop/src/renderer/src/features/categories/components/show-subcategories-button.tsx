import { Button } from '@renderer/features/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/features/ui/tooltip'
import { ListTree } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppRoute } from '@renderer/common/app-route'

interface ShowSubcategoriesButtonProps {
  slug: string
}

export const ShowSubcategoriesButton = ({ slug }: ShowSubcategoriesButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>View sub-categories</TooltipContent>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost" size="icon">
            <Link to={`${AppRoute.Categories}/${slug}`}>
              <ListTree className="h-5 w-5" />
            </Link>
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
