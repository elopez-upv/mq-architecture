import { gql } from '@apollo/client'

const newJobMutation = gql`
  mutation MyMutation($input: job) {
    newJob(input: $input) {
      msg
      result
    }
  }
`

const getJobsQuery = gql`
  query MyQuery($input: client) {
    getJobs(input: $input) {
      id
      url
      fileName
      user
      createdAt
      params
      result
      elapsedTime
    }
  }
`

const operations = {
  newJobMutation,
  getJobsQuery
}

export default operations
