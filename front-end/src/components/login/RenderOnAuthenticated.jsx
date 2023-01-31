import { useKeycloak } from '@react-keycloak/web'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

const RenderOnAuthenticated = ({ children }) => {
  const { keycloak } = useKeycloak()
  const decoded = keycloak.token && jwt_decode(keycloak.token)
  const userName = decoded && decoded.preferred_username
  localStorage.setItem('userName', userName)
  localStorage.setItem('myJobs', JSON.stringify({ jobs: [] }))
  return keycloak.authenticated ? children : false
}

export default RenderOnAuthenticated
