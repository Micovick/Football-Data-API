import { playerResolvers } from "../../src/graphql/resolvers/player.resolver";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    competition: {
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

const prisma = new PrismaClient();

describe("playerResolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("should return players for a given competition code", async () => {
    const mockCompetition = {
      code: "PL",
      teams: [
        {
          name: "Team A",
          squad: [
            { id: 1, name: "Player 1", team: { name: "Team A" } },
            { id: 2, name: "Player 2", team: { name: "Team A" } },
          ],
        },
        {
          name: "Team B",
          squad: [{ id: 3, name: "Player 3", team: { name: "Team B" } }],
        },
      ],
    };
    
    (prisma.competition.findUnique as jest.Mock).mockResolvedValue(mockCompetition);
    
    const result = await playerResolvers.Query.players({}, { competitionCode: "PL" });
    
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { id: 1, name: "Player 1", team: { name: "Team A" } },
      { id: 2, name: "Player 2", team: { name: "Team A" } },
      { id: 3, name: "Player 3", team: { name: "Team B" } },
    ]);
  });
  
  it("should filter players by team name", async () => {
    const mockCompetition = {
      code: "PL",
      teams: [
        {
          name: "Team A",
          squad: [
            { id: 1, name: "Player 1", team: { name: "Team A" } },
            { id: 2, name: "Player 2", team: { name: "Team A" } },
          ],
        },
        {
          name: "Team B",
          squad: [{ id: 3, name: "Player 3", team: { name: "Team B" } }],
        },
      ],
    };
    
    (prisma.competition.findUnique as jest.Mock).mockResolvedValue(mockCompetition);
    
    const result = await playerResolvers.Query.players({}, { competitionCode: "PL", teamName: "Team A" });
    
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 1, name: "Player 1", team: { name: "Team A" } },
      { id: 2, name: "Player 2", team: { name: "Team A" } },
    ]);
  });
  
  it("should return an error if competition is not found", async () => {
    (prisma.competition.findUnique as jest.Mock).mockResolvedValue(null);
    
    await expect(playerResolvers.Query.players({}, { competitionCode: "INVALID" })).rejects.toThrow(
      "Competition not found"
    );
  });
  
  it("should return an empty array if competition exists but has no players", async () => {
    const mockCompetition = {
      code: "PL",
      teams: [
        {
          name: "Team A",
          squad: [],
        },
      ],
    };
    
    (prisma.competition.findUnique as jest.Mock).mockResolvedValue(mockCompetition);
    
    const result = await playerResolvers.Query.players({}, { competitionCode: "PL" });
    
    expect(result).toEqual([]);
  });
});
