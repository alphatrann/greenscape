import { TriangleAlertIcon } from 'lucide-react'
import { useOnlineStatus } from '../contexts/online-context'

export function OfflineBanner() {
  const online = useOnlineStatus()

  if (online) return null

  return (
    <div className="bg-amber-100 text-amber-900 flex justify-center w-full py-2 px-4 font-medium text-sm">
      <div className="flex">
        <TriangleAlertIcon className="w-5 h-5 mr-2" />
        You are offline — some actions may be unavailable
      </div>
    </div>
  )
}
