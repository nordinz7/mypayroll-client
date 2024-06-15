const variable = process.env

const _partials = {
  env: variable.NODE_ENV || 'development',
  port: variable.PORT || 3000,
  apiUrl: variable.API_URL || 'http://localhost:8000'
}

const config = {
  ..._partials,
  api: {
    url: _partials.apiUrl,
    graphql: `${_partials.apiUrl}/graphql`
  }
}

export default config
