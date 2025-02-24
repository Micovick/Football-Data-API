import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const teamResolvers = {
  Query: {
    teams: async (_: unknown, { competitionCode }: { competitionCode: string }) => {
      const competition = await prisma.competition.findUnique({
        where: { code: competitionCode },
        include: { teams: true },
      });
      if (!competition) throw new Error("Competition not found");
      return competition.teams;
    },
    
    team: async (_: unknown, { name }: { name: string }) => {
      return prisma.team.findFirst({
        where: { name },
        include: { squad: true, coach: true, competitions: true },
      });
    },
  },
};
