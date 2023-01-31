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
      user
      createdAt
      params
    }
  }
`

const operations = {
  newJobMutation,
  getJobsQuery
}

export default operations
