import React from 'react'
import Header from './common/Header'
import JobsQuery from '../hooks/git-executor/getJobs'

function App({ children }) {
  const newJobsQuery = JobsQuery()
  const { getJobs } = newJobsQuery
  getJobs()

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
