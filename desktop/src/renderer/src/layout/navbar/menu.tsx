import { Button } from '@renderer/features/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@renderer/features/ui/collapsible'
import { User } from '@renderer/features/users/types'
import { cn } from '@renderer/lib/utils'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { navLinks } from './links-data'
import { Link, useLocation } from 'react-router-dom'
import { AppRoute } from '../../common/app-route'

export const NavMobileMenu = ({ user }: { user: User | null }) => {
  const location = useLocation()

  if (!user) return null

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <Bars3Icon className="h-5 w-5" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="absolute left-0 top-16 z-20 w-full space-y-1 bg-white px-0 pb-4 pt-2 shadow-md lg:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              'block border-l-4 border-transparent px-3 py-2 pr-4 text-base font-medium',
              location.pathname === link.href ||
                (location.pathname.startsWith(link.href) && link.href !== AppRoute.Home)
                ? 'border-primary bg-green-50 text-green-800'
                : 'text-muted-foreground hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700'
            )}
          >
            {link.name}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
