'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDeleteRecordsModal } from './use-modal'
import { deleteRecords } from './api'

export const useDeleteRecords = () => {
  const { onClose, ids } = useDeleteRecordsModal()
  const [loading, setLoading] = useState(false)
  const onDeleteRecords = async (
    entityName: 'categories' | 'products',
    deleteInUI: (ids: (string | number)[]) => void
  ) => {
    try {
      setLoading(true)
      await deleteRecords(ids, entityName)
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
