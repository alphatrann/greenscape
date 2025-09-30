import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { app } from 'electron'
import path from 'path'
import { Order, Product } from '../common/types'

type Data = {
  products: Product[]
  orders: Order[]
}

const file = path.join(app.getPath('userData'), 'db.json')
const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, { products: [], orders: [] })

export async function initDB() {
  await db.read()
  db.data ||= { products: [], orders: [] }
  await db.write()
}

export default db
