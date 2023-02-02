import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import operations from '../../graphql/operations'
import { GlobalContext } from '../../provider/global'

const { getJobsQuery } = operations

const jobsQuery = () => {
  const { setGlobal } = useContext(GlobalContext)
  const { loading, error, data } = useQuery(getJobsQuery, {
    variables: {
      input: {
        userName: localStorage.getItem('userName')
      }
    },
    pollInterval: 1000
  })

  useEffect(() => {
    let tempJobs = []

    if (!loading && !error && data.getJobs && data.getJobs.length > 0) {
      const temp = JSON.parse(localStorage.getItem('myJobs')) || {}
      tempJobs = temp?.jobs || []
      tempJobs = tempJobs.concat(data.getJobs || [])
      localStorage.setItem('myJobs', JSON.stringify({ jobs: tempJobs }))
      setGlobal({ jobs: tempJobs })
    }
    return () => { }
  }, [data])

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div />
  )
}

export default jobsQuery
