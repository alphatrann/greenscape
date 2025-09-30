import { getToken } from '../local-store/token'

export const deleteRecords = async (
  ids: (number | string)[],
  entityName: 'categories' | 'products'
) => {
  const token = await getToken({ throw: true })
  const idsString = ids.join(',')
  await fetch(`${import.meta.env.VITE_API_URL}/${entityName}?ids=${idsString}`, {
    method: 'DELETE',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}
