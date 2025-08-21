'use client'
import { cn } from '@renderer/lib/utils'
import { navLinks } from './links-data'
import { Link, useLocation } from 'react-router-dom'
import { AppRoute } from '../../common/app-route'

export const Links = () => {
  const location = useLocation()
  return (
    <ul className="hidden h-16 items-center space-x-4 lg:flex lg:space-x-6">
      {navLinks.map((link) => (
        <li key={link.href} className="h-16">
          <Link
            to={link.href}
            className={cn(
              'flex h-16 items-center border-b-2 border-transparent px-1 text-sm font-medium text-muted-foreground',
              location.pathname === link.href ||
                (location.pathname.startsWith(link.href) && link.href !== AppRoute.Home)
                ? 'border-primary font-semibold text-gray-900'
                : 'hover:border-gray-300'
            )}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
