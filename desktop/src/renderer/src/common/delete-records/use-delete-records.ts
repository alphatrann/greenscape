import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDeleteRecordsModal } from './use-modal'
import { useFiltersContext } from '../contexts/filters-context'
import { useOnlineStatus } from '../contexts/online-context'

export const useDeleteRecords = () => {
  const { onClose, ids } = useDeleteRecordsModal()
  const { online } = useOnlineStatus()
  const [loading, setLoading] = useState(false)
  const { setTotal } = useFiltersContext()
  const onDeleteRecords = async (
    entityName: 'categories' | 'products',
    deleteInUI: (ids: (string | number)[]) => void
  ) => {
    try {
      setLoading(true)
      if (online) await window.electronAPI.deleteRecords(ids, entityName)
      else {
        toast.error(`Deleting ${entityName} is unavailable in offline mode`)
        return
      }

      /** @todo store pending delete operations */
      setTotal((t) => t - ids.length)
      deleteInUI(ids)
      onClose()

      toast.success('Records deleted successfully')
    } catch (error) {
      console.log(error)

      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return { onDeleteRecords, loading }
}
