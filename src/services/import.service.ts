import { PrismaClient } from "@prisma/client";
import { FootballService } from "./football.service";

const prisma = new PrismaClient();

export class ImportService {
  static async importLeague(leagueCode: string) {
    try {
      const competitionData = await FootballService.getCompetition(leagueCode);
      const teamsData = await FootballService.getTeams(leagueCode);
      
      const savedCompetition = await prisma.competition.upsert({
        where: { code: competitionData.code },
        update: {},
        create: {
          name: competitionData.name,
          code: competitionData.code,
          areaName: competitionData.area.name,
          type: competitionData.type,
          emblem: competitionData.emblem,
        },
      });
      
      for (const team of teamsData) {
        const savedTeam = await prisma.team.upsert({
          where: { tla: team.tla },
          update: {},
          create: {
            name: team.name,
            tla: team.tla,
            shortName: team.shortName,
            areaName: team.area.name,
            address: team.address,
            website: team.website,
            founded: team.founded,
            clubColors: team.clubColors,
            venue: team.venue,
          },
        });
        
        // Link team to competition
        await prisma.$executeRaw`
          INSERT INTO "_CompetitionTeams" ("A", "B")
          VALUES (${savedCompetition.id}, ${savedTeam.id})
          ON CONFLICT DO NOTHING;
        `;
        
        // Insert Coach
        await prisma.coach.upsert({
          where: { teamId: savedTeam.id },
          update: {},
          create: {
            name: team.coach.name,
            nationality: team.coach.nationality,
            dateOfBirth: new Date(team.coach.dateOfBirth).toISOString(),
            teamId: savedTeam.id,
          },
        });
        
        // Insert Players
        for (const player of team.squad) {
          await prisma.player.upsert({
            where: { id: player.id },
            update: {},
            create: {
              name: player.name,
              position: player.position,
              nationality: player.nationality,
              dateOfBirth: new Date(player.dateOfBirth).toISOString(),
              shirtNumber: player.shirtNumber,
              teamId: savedTeam.id,
            },
          });
        }
      }
      
      return `League ${competitionData.name} imported successfully`;
    } catch (error) {
      console.error("Error importing league:", error);
      return "Error importing league";
    }
  }
}
