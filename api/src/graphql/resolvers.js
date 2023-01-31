import { event } from '../controllers/index.js'
import { eventService } from '../services/index.js'

const resolvers = {
    Query: {
        // eslint-disable-next-line no-empty-pattern
        getJobs: (_, { input }) => eventService.informEvents(input)
    },
    Mutation: {
        newJob: (_, { input }) => event.newEventAction(input)
    }
}

export default resolvers
