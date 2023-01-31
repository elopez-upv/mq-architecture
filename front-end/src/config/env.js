const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3000',
  REACT_APP_KEYCLOAK_REALM: process.env.REACT_APP_KEYCLOAK_REALM || 'dev',
  REACT_APP_KEYCLOAK_URL: process.env.REACT_APP_KEYCLOAK_URL || 'http://localhost:8080',
  REACT_APP_KEYCLOAK_CLIENT_ID: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || 'dev'
}

export default env
