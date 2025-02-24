import { gql } from "apollo-server";

export const playerTypeDefs = gql`
  type Player {
    id: ID!
    name: String!
    position: String!
    dateOfBirth: String!
    nationality: String!
    shirtNumber: Int
    team: Team
  }

  extend type Query {
    players(competitionCode: String!, teamName: String): [Player!]
  }
`;
