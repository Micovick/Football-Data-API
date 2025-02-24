import { gql } from "apollo-server";

export const competitionTypeDefs = gql`
  type Competition {
    id: ID!
    name: String!
    code: String!
    type: String
    emblem: String
    teams: [Team!]
  }

  extend type Query {
    competitions: [Competition!]
  }
`;
