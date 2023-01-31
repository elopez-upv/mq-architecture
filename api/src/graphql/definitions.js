const definitions = `#graphql
    type Query {
        hello: String
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
`

export default definitions
