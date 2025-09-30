import { Button } from '@renderer/features/ui/button'
import { Link } from 'react-router-dom'
import { AppRoute } from '../app-route'

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-secondary-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Button className="mt-10" asChild>
          <Link to={AppRoute.Home}>Back to dashboard</Link>
        </Button>
      </div>
    </main>
  )
}
