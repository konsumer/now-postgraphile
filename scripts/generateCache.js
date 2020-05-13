// this will generate ../postgraphile_cache.json at build-time for postgraphile

import { createPostGraphileSchema } from 'postgraphile'
import { Pool } from 'pg'

const { DATABASE_SCHEMAS = 'public', DATABASE_URL } = process.env
const schemas = DATABASE_SCHEMAS.split(',')

async function main () {
  console.log('Generating cache....')
  const pgPool = new Pool({
    connectionString: DATABASE_URL
  })
  await createPostGraphileSchema(pgPool, schemas, {
    writeCache: `${__dirname}/../postgraphile_cache.json`
  })
  await pgPool.end()
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
