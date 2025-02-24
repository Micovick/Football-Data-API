import { gql } from "apollo-server";

export const coachTypeDefs = gql`
  type Coach {
    id: ID!
    name: String!
    dateOfBirth: String
    nationality: String
    team: Team
  }
`;
