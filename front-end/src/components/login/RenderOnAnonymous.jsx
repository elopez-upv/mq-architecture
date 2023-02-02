import { useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router-dom'

const RenderOnAnonymous = ({ children }) => {
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (!keycloak.authenticated && window.location.pathname !== '/') {
        navigate('/')
      }
    }, 1000)
  }, [])

  return !keycloak.authenticated ? children : null
}

export default RenderOnAnonymous
