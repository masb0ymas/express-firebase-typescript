import swaggerUi from 'swagger-ui-express'

require('dotenv').config()

const { URL_API_DOCS_DEV, URL_API_DOCS_PROD } = process.env

let baseUrlSwaggerJson = []
if (process.env.NODE_ENV === 'production') {
  baseUrlSwaggerJson = [
    {
      url: URL_API_DOCS_PROD,
      name: 'Production Server',
    },
  ]
} else {
  baseUrlSwaggerJson = [
    {
      url: URL_API_DOCS_DEV,
      name: 'Development Server',
    },
    {
      url: URL_API_DOCS_PROD,
      name: 'Production Server',
    },
  ]
}

module.exports = function generateDocs(app) {
  const options = {
    explorer: true,
    swaggerOptions: {
      urls: baseUrlSwaggerJson,
    },
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options))
}
