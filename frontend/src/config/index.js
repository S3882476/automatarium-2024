const env = process.env.NODE_ENV || 'development'

const firebaseConfigDev = require('./firebase-config-dev.json')


// Ensure required keys are present for production environment
const requiredEnvKeys = ['BASE_URL', 'API']
if (env === 'production') {
  for (let key in requiredEnvKeys) {
    if (!process.env[key]) {
      console.error(`⚠️ Expected to see ${key}`)
    }
  }
}

const config = {
  development: {
    baseUrl: 'http://localhost:1234',
    API: 'http://localhost:3001',
    documentTitle: '[Dev] Automatarium',
    firebaseConfig: firebaseConfigDev,
  },
  production: {
    baseUrl: process.env.BASE_URL,
    API: process.env.API,
    documentTitle: 'Automatarium',
    firebaseConfig: firebaseConfigDev,
  }
}

export default config[env]
