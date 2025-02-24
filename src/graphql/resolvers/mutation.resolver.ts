import { PrismaClient, Prisma } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const FOOTBALL_API = "http://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_API_KEY || "your-api-key-here";

export const mutationResolvers = {
  Mutation: {
    importLeague: async (_: unknown, { leagueCode }: { leagueCode: string }) => {
      try {
        const { data } = await axios.get(`${FOOTBALL_API}/competitions/${leagueCode}/teams`, {
          headers: { "X-Auth-Token": API_KEY },
        });
        
        const competition = data.competition;
        const teams = data.teams;
        
        const savedCompetition = await prisma.competition.upsert({
          where: { code: competition.code },
          update: {},
          create: {
            name: competition.name,
            code: competition.code,
            type: competition.type,
            emblem: competition.emblem,
          },
        });
        
        for (const team of teams) {
          const savedTeam = await prisma.team.upsert({
            where: { tla: team.tla },
            update: {},
            create: {
              name: team.name,
              tla: team.tla,
              shortName: team.shortName,
              address: team.address,
              website: team.website,
              founded: team.founded,
              clubColors: team.clubColors,
              venue: team.venue,
            },
          });
          
          await prisma.$executeRaw`INSERT INTO "_CompetitionTeams" ("A", "B") VALUES (${savedCompetition.id}, ${savedTeam.id}) ON CONFLICT DO NOTHING;`;
          
          if (team.coach?.name) {
            const coachData = {
              name: team.coach.name,
              nationality: team.coach.nationality,
              teamId: savedTeam.id,
              dateOfBirth: new Date(team.coach.dateOfBirth),
            };
            
            await prisma.coach.upsert({
              where: { teamId: savedTeam.id },
              update: {},
              create: coachData,
            });
          }
          
          for (const player of team.squad) {
            const playerData = {
              name: player.name,
              position: player.position,
              nationality: player.nationality,
              shirtNumber: player.shirtNumber,
              teamId: savedTeam.id,
              dateOfBirth: new Date(player.dateOfBirth),
            };
            
            await prisma.player.upsert({
              where: { id: player.id },
              update: {},
              create: playerData,
            });
          }
        }
        
        return `League ${competition.name} imported successfully`;
      } catch (error) {
        console.error(error);
        return "Error importing league";
      }
    },
  },
};
