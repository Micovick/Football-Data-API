import { gql } from "apollo-server";
import {competitionTypeDefs} from "./competition.schema";
import {teamTypeDefs} from "./team.schema";
import {playerTypeDefs} from "./player.schema";
import {coachTypeDefs} from "./coach.schema";
import {mutationTypeDefs} from "./mutation.schema";

export const typeDefs = gql`
  type Query
  type Mutation
  ${competitionTypeDefs}
  ${teamTypeDefs}
  ${playerTypeDefs}
  ${coachTypeDefs}
  ${mutationTypeDefs}
`;
