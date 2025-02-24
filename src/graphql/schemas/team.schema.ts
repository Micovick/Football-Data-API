import { gql } from "apollo-server";

export const teamTypeDefs = gql`
  type Team {
    id: ID!
    name: String!
    tla: String!
    shortName: String!
    address: String
    website: String
    founded: Int
    clubColors: String
    venue: String
    competitions: [Competition!]
    coach: Coach
    squad: [Player!]
  }

  extend type Query {
    teams(competitionCode: String!): [Team!]
    team(name: String!): Team
  }
`;
