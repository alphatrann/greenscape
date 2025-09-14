import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { app } from 'electron'
import path from 'path'
import { Product, Category, Order } from './types'

type Data = {
  products: Product[]
  categories: Category[]
  orders: Order[]
}

const file = path.join(app.getPath('userData'), 'db.json')
const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, { products: [], categories: [], orders: [] })

export async function initDB() {
  await db.read()
  db.data ||= { products: [], categories: [], orders: [] }
  await db.write()
}

export default db
