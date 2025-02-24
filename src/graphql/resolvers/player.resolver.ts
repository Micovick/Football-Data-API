import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const playerResolvers = {
  Query: {
    players: async (_: unknown, { competitionCode, teamName }: { competitionCode: string, teamName: string}) => {
      const competition = await prisma.competition.findUnique({
        where: { code: competitionCode },
        include: {
          teams: {
            include: {
              squad: {
                include: { team: true }
              },
              coach: true
            }
          }
        },
      });
      
      if (!competition) throw new Error("Competition not found");
      
      let players = competition.teams.flatMap((team) => team.squad);
      
      if (teamName) {
        players = players.filter((player) => player.team?.name.toLowerCase() === teamName.toLowerCase());
      }
      
      return players;
    },
  },
};
