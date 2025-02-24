import { competitionResolvers } from "./competition.resolver";
import { teamResolvers } from "./team.resolver";
import { playerResolvers } from "./player.resolver";
import { mutationResolvers } from "./mutation.resolver";

export const resolvers = {
  Query: {
    ...competitionResolvers.Query,
    ...teamResolvers.Query,
    ...playerResolvers.Query,
  },
  Mutation: {
    ...mutationResolvers.Mutation,
  },
};
