import { ApolloServer } from '@apollo/server'
import definitions from '../graphql/definitions.js'
import resolvers from '../graphql/resolvers.js'

const server = new ApolloServer({
    typeDefs: definitions,
    resolvers
})

export default server
