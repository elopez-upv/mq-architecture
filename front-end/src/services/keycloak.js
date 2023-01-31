import Keycloak from 'keycloak-js'
import env from '../config/env'

const keycloak = new Keycloak({
  realm: env.REACT_APP_KEYCLOAK_REALM,
  url: env.REACT_APP_KEYCLOAK_URL,
  clientId: env.REACT_APP_KEYCLOAK_CLIENT_ID
})

export default keycloak
