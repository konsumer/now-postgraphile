import { postgraphile } from 'postgraphile'

import readCache from '../postgraphile_cache.json'

const { DATABASE_SCHEMAS = 'public', DATABASE_URL } = process.env
const schemas = DATABASE_SCHEMAS.split(',')

const options = {
	watchPg: false,
	graphiql: false,
	graphqlRoute: '/api/graphql'
}

const pg = postgraphile(DATABASE_URL, schemas, {
  ...options,
  readCache
})

module.exports = (req, res, next) => {
	pg(req, res, next)
}
