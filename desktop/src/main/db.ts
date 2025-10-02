import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { app } from 'electron'
import path from 'path'
import { Category, Order, Product } from '../common/types'
import { SyncOperation } from './types'

type Data = {
  products: Product[]
  orders: Order[]
  categories: Category[]
  ops: SyncOperation[]
}

const file = path.join(app.getPath('userData'), 'db.json')
const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, { products: [], orders: [], ops: [], categories: [] })

export async function initDB() {
  await db.read()
  db.data ||= { products: [], orders: [], ops: [], categories: [] }
  await db.write()
}

export default db
