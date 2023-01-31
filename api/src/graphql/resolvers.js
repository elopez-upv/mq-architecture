import { event } from '../controllers/index.js'

const resolvers = {
    Query: {
        hello: () => 'world'
    },
    Mutation: {
        newJob: (_, { input }) => event.newEventAction(input)
    }
}

export default resolvers
