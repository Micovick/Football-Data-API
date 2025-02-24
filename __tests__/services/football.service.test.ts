import { FootballService } from "../../src/services/football.service";
import axios from "axios";
import Bottleneck from "bottleneck";

jest.mock("axios");

describe("FootballService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe("getCompetition", () => {
    it("should fetch competition data", async () => {
      const mockResponse = { data: { name: "Premier League", code: "PL", area: { name: "England" } } };
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);
      
      const result = await FootballService.getCompetition("PL");
      
      expect(axios.get).toHaveBeenCalledWith("http://api.football-data.org/v4/competitions/PL", expect.any(Object));
      expect(result).toEqual(mockResponse.data);
    });
    
    it("should handle errors when fetching competition data", async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error("API error"));
      
      await expect(FootballService.getCompetition("PL")).rejects.toThrow("Failed to fetch competition data.");
    });
  });
  
  describe("getTeams", () => {
    it("should fetch teams data", async () => {
      const mockResponse = {
        data: {
          teams: [
            { id: 1, name: "Team A", tla: "TMA" },
            { id: 2, name: "Team B", tla: "TMB" },
          ],
        },
      };
      
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);
      
      const result = await FootballService.getTeams("PL");
      
      expect(axios.get).toHaveBeenCalledWith("http://api.football-data.org/v4/competitions/PL/teams", expect.any(Object));
      expect(result).toEqual(mockResponse.data.teams);
    });
    
    it("should handle errors when fetching teams data", async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error("API error"));
      
      await expect(FootballService.getTeams("PL")).rejects.toThrow("Failed to fetch teams data.");
    });
  });
});
