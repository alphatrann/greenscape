export const deleteRecords = async (
  ids: (number | string)[],
  entityName: 'categories' | 'products'
) => {
  const idsString = ids.join(',')
  await fetch(`${import.meta.env.VITE_API_URL}/${entityName}?ids=${idsString}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
