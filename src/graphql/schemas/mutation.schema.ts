import { gql } from "apollo-server";

export const mutationTypeDefs = gql`
    extend type Mutation {
        importLeague(leagueCode: String!): String!
    }
`;
