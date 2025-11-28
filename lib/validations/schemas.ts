// Zod validation schemas
import { z } from 'zod';

export const matchSchema = z.object({
  id: z.string(),
  apiId: z.string(),
  title: z.string(),
  matchFormat: z.enum(['Test', 'ODI', 'T20', 'T10']),
  venue: z.string(),
  startTime: z.string().datetime(),
  status: z.enum(['Scheduled', 'Live', 'Completed', 'Abandoned']),
  team1: z.string(),
  team2: z.string(),
  team1Score: z.string().optional(),
  team2Score: z.string().optional(),
  result: z.string().optional(),
  tossWinner: z.string().optional(),
  tossDecision: z.string().optional(),
  seriesName: z.string().optional(),
});

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  logo: z.string().url().optional(),
  country: z.string(),
  apiId: z.string(),
});

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper']),
  battingStyle: z.string().optional(),
  bowlingStyle: z.string().optional(),
  image: z.string().url().optional(),
  country: z.string(),
  apiId: z.string(),
  teamId: z.string(),
});

export const notificationSettingsSchema = z.object({
  matchStart: z.boolean(),
  liveUpdates: z.boolean(),
  criticalMoments: z.boolean(),
  matchResults: z.boolean(),
  newsAlerts: z.boolean(),
});

