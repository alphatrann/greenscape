import { TriangleAlertIcon } from 'lucide-react'
import { useOnlineStatus } from '../contexts/online-context'

export function ConnectionBanner() {
  const { online, syncing } = useOnlineStatus()

  if (online && syncing)
    return (
      <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 flex justify-center w-full py-2 px-4 font-medium text-sm">
        <div className="flex gap-x-2 items-center">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
          </span>
          Syncing data... Please do not close the window
        </div>
      </div>
    )
  if (!online) {
    return (
      <div className="bg-amber-100 dark:text-amber-100 dark:bg-amber-900 text-amber-900 flex justify-center w-full py-2 px-4 font-medium text-sm">
        <div className="flex">
          <TriangleAlertIcon className="w-5 h-5 mr-2" />
          You are offline. Some actions may not be available
        </div>
      </div>
    )
  }
  return null
}
