import { TriangleAlertIcon } from 'lucide-react'
import { useOnlineStatus } from '../contexts/online-context'

export function ConnectionBanner() {
  const { online, lastChangedAt } = useOnlineStatus()

  if (online && lastChangedAt)
    return (
      <div className="bg-green-100 text-green-900 flex justify-center w-full py-2 px-4 font-medium text-sm">
        <div className="flex gap-x-2 items-center">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
          </span>
          Connected (since {lastChangedAt.toLocaleTimeString()})
        </div>
      </div>
    )
  if (!online) {
    return (
      <div className="bg-amber-100 text-amber-900 flex justify-center w-full py-2 px-4 font-medium text-sm">
        <div className="flex">
          <TriangleAlertIcon className="w-5 h-5 mr-2" />
          You are offline — showing cached data{' '}
          {lastChangedAt && `(lost connection at ${lastChangedAt.toLocaleTimeString()})`}
        </div>
      </div>
    )
  }
  return null
}
