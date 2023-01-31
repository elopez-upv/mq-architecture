import React from 'react'
import Header from './common/Header'

function App({ children }) {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
    </div>
  )
}

export default App
