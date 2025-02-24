import { teamResolvers } from "../../src/graphql/resolvers/team.resolver";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    competition: {
      findUnique: jest.fn(),
    },
    team: {
      findFirst: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

const prisma = new PrismaClient();

describe("teamResolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe("Query.teams", () => {
    it("should return teams for a given competition code", async () => {
      const mockCompetition = {
        code: "PL",
        teams: [
          { id: 1, name: "Team A", squad: [], coach: null },
          { id: 2, name: "Team B", squad: [], coach: { name: "Coach B" } },
        ],
      };
      
      (prisma.competition.findUnique as jest.Mock).mockResolvedValue(mockCompetition);
      
      const result = await teamResolvers.Query.teams({}, { competitionCode: "PL" });
      
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 1, name: "Team A", squad: [], coach: null },
        { id: 2, name: "Team B", squad: [], coach: { name: "Coach B" } },
      ]);
    });
    
    it("should throw an error if competition is not found", async () => {
      (prisma.competition.findUnique as jest.Mock).mockResolvedValue(null);
      
      await expect(teamResolvers.Query.teams({}, { competitionCode: "INVALID" })).rejects.toThrow(
        "Competition not found"
      );
    });
    
    it("should return an empty array if competition has no teams", async () => {
      const mockCompetition = {
        code: "PL",
        teams: [],
      };
      
      (prisma.competition.findUnique as jest.Mock).mockResolvedValue(mockCompetition);
      
      const result = await teamResolvers.Query.teams({}, { competitionCode: "PL" });
      
      expect(result).toEqual([]);
    });
  });
  
  describe("Query.team", () => {
    it("should return a team by name", async () => {
      const mockTeam = {
        id: 1,
        name: "Team A",
        squad: [{ id: 101, name: "Player 1", position: "Forward" }],
        coach: { name: "Coach A" },
        competitions: [{ code: "PL", name: "Premier League" }],
      };
      
      (prisma.team.findFirst as jest.Mock).mockResolvedValue(mockTeam);
      
      const result = await teamResolvers.Query.team({}, { name: "Team A" });
      
      expect(result).toEqual(mockTeam);
    });
    
    it("should return null if no team is found", async () => {
      (prisma.team.findFirst as jest.Mock).mockResolvedValue(null);
      
      const result = await teamResolvers.Query.team({}, { name: "Unknown Team" });
      
      expect(result).toBeNull();
    });
  });
});
