import { gql } from "apollo-server";

export const competitionTypeDefs = gql`
  type Competition {
    id: ID!
    name: String!
    code: String!
    areaName: String!
    type: String
    emblem: String
    teams: [Team!]
  }

  extend type Query {
    competitions: [Competition!]
  }
`;
