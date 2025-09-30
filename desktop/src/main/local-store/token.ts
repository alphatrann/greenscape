import { SERVICE_NAME, ACCOUNT_NAME } from '../constants'
import keytar from 'keytar'

export async function saveToken(jwt: string) {
  await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, jwt)
}

export async function getToken(options?: { throw: boolean }) {
  const token = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME)
  if (!token && options?.throw) throw new Error('Unauthorized')
  return token
}

export async function deleteToken() {
  await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME)
}
