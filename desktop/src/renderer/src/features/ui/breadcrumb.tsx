import { cn } from '@renderer/lib/utils'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import React from 'react'
import { AppRoute } from '../../common/app-route'

interface BreadcrumbProps {
  links: {
    name: string
    href: string
  }[]
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4 overflow-x-auto pb-2">
        <li>
          <Link
            to={AppRoute.Home}
            className="flex-shrink-0 text-muted-foreground hover:text-secondary-foreground"
          >
            <HomeIcon className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {links.map((link, index) => (
          <li key={link.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <Link
                to={link.href}
                className={cn(
                  'ml-4 truncate text-sm font-medium text-muted-foreground',
                  index === links.length - 1 ? 'text-foreground' : 'hover:text-primary'
                )}
              >
                {link.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
