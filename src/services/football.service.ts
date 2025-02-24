import axios from "axios";
import Bottleneck from "bottleneck";

const FOOTBALL_API = "http://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_API_KEY || "";

const limiter = new Bottleneck({
  minTime: 1500, // 1.5 seconds between requests
  maxConcurrent: 1, // One request at a time
});

export class FootballService {
  static async getCompetition(competitionCode: string) {
    try {
      return await limiter.schedule(async () => {
        const { data } = await axios.get(`${FOOTBALL_API}/competitions/${competitionCode}`, {
          headers: { "X-Auth-Token": API_KEY },
        });
        return data;
      });
    } catch (error) {
      console.error("Error fetching competition:", error);
      throw new Error("Failed to fetch competition data.");
    }
  }
  
  static async getTeams(competitionCode: string) {
    try {
      return await limiter.schedule(async () => {
        const { data } = await axios.get(`${FOOTBALL_API}/competitions/${competitionCode}/teams`, {
          headers: { "X-Auth-Token": API_KEY },
        });
        return data.teams; // ✅ Ensure teams data is returned
      });
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw new Error("Failed to fetch teams data.");
    }
  }
}
