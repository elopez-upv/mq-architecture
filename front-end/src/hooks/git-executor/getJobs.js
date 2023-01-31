import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import operations from '../../graphql/operations'

const { getJobsQuery } = operations

const jobsQuery = () => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(getJobsQuery, {
    variables: {
      input: {
        userName: localStorage.getItem('userName')
      }
    }
  })

  const getJobs = async () => {
    useEffect(() => {
      startPolling(1000)
      return () => {
        stopPolling()
      }
    }, [startPolling, stopPolling])

    if (loading) return null
    if (error) return null

    if (data.getJobs && data.getJobs.length > 0) {
      const temp = JSON.parse(localStorage.getItem('myJobs')) || {}
      let tempJobs = []
      tempJobs = temp?.jobs || []
      tempJobs = tempJobs.concat(data.getJobs || [])
      localStorage.setItem('myJobs', JSON.stringify({ jobs: tempJobs }))
    }
    return true
  }

  return {
    getJobs
  }
}

export default jobsQuery
