const definitions = `#graphql
    type Query {
        getJobs(input: client): [jobResult]
    }

    type Mutation {
        newJob(input: job): Response
    }

    type Response {
        result: String
        msg: String
    }

    input job {
        id: String!,
        url: String!,
        fileName: String!,
        user: String!,
        createdAt: String!,
        params: String
    }

    input client {
        userName: String!
    }

    type jobResult {
        id: String!
        url: String!
        fileName: String!
        user: String!
        createdAt: String!
        params: String
        result: String!
        elapsedTime: String!
    }
`

export default definitions
