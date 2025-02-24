import {ImportService} from "../../services/import.service";

export const mutationResolvers = {
  Mutation: {
    importLeague: async (_: unknown, { leagueCode }: { leagueCode: string }) => {
      return await ImportService.importLeague(leagueCode);
    },
  },
};
