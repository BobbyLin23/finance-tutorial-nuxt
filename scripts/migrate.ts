import process from 'node:process'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { neon } from '@neondatabase/serverless'

config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function main() {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' })
  }
  catch (e) {
    console.error('Error during migration:', e)
    process.exit()
  }
}

main()
