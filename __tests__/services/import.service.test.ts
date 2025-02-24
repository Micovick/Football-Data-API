import { ImportService } from "../../src/services/import.service";
import { PrismaClient } from "@prisma/client";
import { FootballService } from "../../src/services/football.service";

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    competition: { upsert: jest.fn() },
    team: { upsert: jest.fn() },
    coach: { upsert: jest.fn() },
    player: { upsert: jest.fn() },
    $executeRaw: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

jest.mock("../../src/services/football.service");

const prisma = new PrismaClient();

describe("ImportService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("should successfully import a league", async () => {
    const mockCompetition = { name: "Premier League", code: "PL", area: { name: "England" }, type: "League", emblem: "url" };
    const mockTeams = [
      {
        tla: "MUN",
        name: "Manchester United",
        shortName: "Man Utd",
        area: { name: "England" },
        address: "Old Trafford",
        website: "http://manutd.com",
        founded: 1878,
        clubColors: "Red/White",
        venue: "Old Trafford",
        coach: { name: "Erik ten Hag", nationality: "Dutch", dateOfBirth: "1970-02-02" },
        squad: [
          { id: 1, name: "Player 1", position: "Forward", nationality: "English", dateOfBirth: "1995-06-10", shirtNumber: 10 },
        ],
      },
    ];
    
    (FootballService.getCompetition as jest.Mock).mockResolvedValue(mockCompetition);
    (FootballService.getTeams as jest.Mock).mockResolvedValue(mockTeams);
    
    (prisma.competition.upsert as jest.Mock).mockResolvedValue({ id: 1, ...mockCompetition });
    (prisma.team.upsert as jest.Mock).mockResolvedValue({ id: 101, ...mockTeams[0] });
    
    const result = await ImportService.importLeague("PL");
    
    expect(FootballService.getCompetition).toHaveBeenCalledWith("PL");
    expect(FootballService.getTeams).toHaveBeenCalledWith("PL");
    expect(prisma.competition.upsert).toHaveBeenCalled();
    expect(prisma.team.upsert).toHaveBeenCalled();
    expect(prisma.coach.upsert).toHaveBeenCalled();
    expect(prisma.player.upsert).toHaveBeenCalled();
    expect(result).toBe("League Premier League imported successfully");
  });
  
  it("should handle errors gracefully", async () => {
    (FootballService.getCompetition as jest.Mock).mockRejectedValue(new Error("API error"));
    
    const result = await ImportService.importLeague("PL");
    
    expect(result).toBe("Error importing league");
  });
});
