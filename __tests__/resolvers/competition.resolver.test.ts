import { competitionResolvers } from "../../src/graphql/resolvers/competition.resolver"; // Adjust the path accordingly
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    competition: {
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

const prisma = new PrismaClient();

describe("competitionResolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe("Query.competitions", () => {
    it("should return all competitions with teams", async () => {
      const mockCompetitions = [
        {
          id: 1,
          name: "Premier League",
          code: "PL",
          teams: [{ id: 1, name: "Team A" }, { id: 2, name: "Team B" }],
        },
        {
          id: 2,
          name: "La Liga",
          code: "LL",
          teams: [{ id: 3, name: "Team C" }],
        },
      ];
      
      (prisma.competition.findMany as jest.Mock).mockResolvedValue(mockCompetitions);
      
      const result = await competitionResolvers.Query.competitions();
      
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockCompetitions);
    });
    
    it("should return an empty array if no competitions exist", async () => {
      (prisma.competition.findMany as jest.Mock).mockResolvedValue([]);
      
      const result = await competitionResolvers.Query.competitions();
      
      expect(result).toEqual([]);
    });
    
    it("should handle errors gracefully", async () => {
      (prisma.competition.findMany as jest.Mock).mockRejectedValue(new Error("Database error"));
      
      await expect(competitionResolvers.Query.competitions()).rejects.toThrow("Database error");
    });
  });
});
