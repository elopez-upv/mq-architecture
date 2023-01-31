import { gql } from '@apollo/client'

const newJobMutation = gql`
  mutation MyMutation($input: job) {
    newJob(input: $input) {
      msg
      result
    }
  }
`

const operations = {
  newJobMutation
}

export default operations
