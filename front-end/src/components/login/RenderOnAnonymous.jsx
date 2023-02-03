import { useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router-dom'

const RenderOnAnonymous = ({ children }) => {
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (!keycloak.authenticated) {
        navigate('/')
      }
    }, 1000)
  }, [keycloak.authenticated])

  return !keycloak.authenticated ? children : null
}

export default RenderOnAnonymous
