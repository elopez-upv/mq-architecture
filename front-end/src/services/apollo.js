import { ApolloClient, InMemoryCache } from '@apollo/client'
import env from '../config/env'

const { REACT_APP_GRAPHQL_ENDPOINT } = env

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
})

export default client
