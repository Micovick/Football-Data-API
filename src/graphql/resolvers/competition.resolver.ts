import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const competitionResolvers = {
  Query: {
    competitions: async () => {
      return prisma.competition.findMany({include: {teams: true}});
    },
  },
};
