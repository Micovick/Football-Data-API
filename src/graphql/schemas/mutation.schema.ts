import { gql } from "apollo-server";

export const mutationTypeDefs = gql`
  type Mutation {
    importLeague(leagueCode: String!): String!
  }
`;
