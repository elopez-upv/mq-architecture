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
        user: String!
        createdAt: String!
        params: String
    }
`

export default definitions