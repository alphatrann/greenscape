import { User } from '../../common/types'
import db from '../db'

export async function setLocalUser(user: User | null) {
  await db.read()
  db.data.user = user
  await db.write()
}

export async function getLocalUser() {
  await db.read()
  return db.data.user
}
