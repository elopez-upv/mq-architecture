import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import keycloak from './services/userService'
import App from './components/App'
import Welcome from './components/welcome'
import RenderOnAuthenticated from './components/login/RenderOnAuthenticated'
import RenderOnAnonymous from './components/login/RenderOnAnonymous'
import GitExecutor from './components/git-executor/index'

const Root = () => {
  const abortController = new AbortController()
  useEffect(() => (
    function cleanup() {
      abortController.abort()
    }
  ))

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <React.StrictMode>
        <div style={{ background: 'radial-gradient(circle at 52.1% -29.6%, rgb(144, 17, 105) 0%, rgb(51, 0, 131) 100.2%)' }}>
          <BrowserRouter basename="/">
            <RenderOnAnonymous>
              <Routes>
                <Route path="/" element={<Welcome />} />
              </Routes>
            </RenderOnAnonymous>
            <RenderOnAuthenticated>
              <App>
                <Routes>
                  <Route path="/" element={<GitExecutor />} />
                </Routes>
              </App>
            </RenderOnAuthenticated>
          </BrowserRouter>
        </div>
      </React.StrictMode>
    </ReactKeycloakProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Root />)
