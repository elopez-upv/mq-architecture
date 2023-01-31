import { useKeycloak } from '@react-keycloak/web'

const RenderOnAnonymous = ({ children }) => {
  const { keycloak } = useKeycloak()
  if (keycloak.authenticated) localStorage.clear()
  return !keycloak.authenticated ? children : null
}

export default RenderOnAnonymous
