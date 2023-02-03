import React from 'react'
import Header from './common/Header'
import JobsQuery from '../hooks/git-executor/getJobs'
import { GlobalContextProvider } from '../provider/global'

function App({ children }) {
  return (
    <GlobalContextProvider>
      <JobsQuery />
      <Header />
      <div>
        {children}
      </div>
    </GlobalContextProvider>
  )
}

export default App
