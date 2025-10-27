import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { app } from 'electron'
import path from 'path'
import { Category, Order, Product, User } from '../common/types'
import { SyncOperation } from './types'

type Data = {
  user: User | null
  products: Product[]
  orders: Order[]
  categories: Category[]
  ops: SyncOperation[]
}
const initial = { user: null, products: [], orders: [], ops: [], categories: [] }

const file = path.join(app.getPath('userData'), 'db.json')
const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, initial)

export async function initDB() {
  await db.read()
  db.data ||= initial
  await db.write()
}

export default db
