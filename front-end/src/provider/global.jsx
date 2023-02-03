import React, { useState, useMemo, createContext } from 'react'

const GlobalContext = createContext({
  global: {},
  setGlobal: () => {}
})

function GlobalContextProvider({ children }) {
  const [global, setGlobal] = useState({ jobs: [] })
  const value = useMemo(
    () => ({ global, setGlobal }),
    [global]
  )

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalContextProvider }
