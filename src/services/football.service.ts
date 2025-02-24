import axios from "axios";

const FOOTBALL_API = "http://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_API_KEY || "your-api-key-here";

export class FootballService {
  static async getCompetition(competitionCode: string) {
    try {
      const { data } = await axios.get(`${FOOTBALL_API}/competitions/${competitionCode}`, {
        headers: { "X-Auth-Token": API_KEY },
      });
      return data;
    } catch (error) {
      console.error("Error fetching competition:", error);
      throw new Error("Failed to fetch competition data.");
    }
  }
  
  static async getTeams(competitionCode: string) {
    try {
      const { data } = await axios.get(`${FOOTBALL_API}/competitions/${competitionCode}/teams`, {
        headers: { "X-Auth-Token": API_KEY },
      });
      return data.teams;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw new Error("Failed to fetch teams data.");
    }
  }
}
