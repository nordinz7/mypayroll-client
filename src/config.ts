import 'dotenv/config'

const variable = process.env

const config = {
  env: variable.NODE_ENV || 'development',
  port: variable.PORT || 3000,
  apiUrl: variable.API_URL || 'http://localhost:8000',
  apiGraphqlUrl: variable.API_GRAPHQL_URL || 'http://localhost:8000/graphql',
}

export default config
