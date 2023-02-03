import { useKeycloak } from '@react-keycloak/web'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import moment from 'moment-timezone'

const RenderOnAuthenticated = ({ children }) => {
  const { keycloak } = useKeycloak()

  if (keycloak.authenticated) {
    const decoded = keycloak.token && jwt_decode(keycloak.token)
    const userName = decoded && decoded.preferred_username

    localStorage.setItem('userName', userName)

    const expToken = decoded && decoded.exp
    if (expToken) {
      const date = moment.tz(expToken * 1000, 'Europe/Madrid')
      const time = date.format('HH:mm')
      localStorage.setItem('sessionLimit', time)
    }

    return children
  }

  return false
}

export default RenderOnAuthenticated
