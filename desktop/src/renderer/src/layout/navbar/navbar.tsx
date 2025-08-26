import { DesktopLogo, MobileLogo } from '@renderer/features/ui/logo'
import { Links } from './links'
import { NavMobileMenu } from './menu'
import { Profile } from './profile'
import { Link } from 'react-router-dom'
import { AppRoute } from '@renderer/common/app-route'
import { useUserStore } from '@renderer/features/users/store'
import { useUserGuard } from '@renderer/features/users/hooks/use-user-guard'

export function Navbar() {
  useUserGuard()
  const user = useUserStore((state) => state.user)
  return (
    <nav className="relative w-full border-b px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-x-6">
          <Link to={AppRoute.Home} className="lg:hidden">
            <MobileLogo />
          </Link>
          <Link to={AppRoute.Home} className="hidden lg:block">
            <DesktopLogo />
          </Link>
          <Links />
        </div>
        <div className="flex h-full items-center gap-x-6">
          <Profile user={user} />
          <NavMobileMenu user={user} />
        </div>
      </div>
    </nav>
  )
}
