// API type definitions for cricket data

export interface Match {
  id: string;
  apiId: string;
  title: string;
  matchFormat: 'Test' | 'ODI' | 'T20' | 'T10';
  venue: string;
  startTime: string;
  status: 'Scheduled' | 'Live' | 'Completed' | 'Abandoned';
  team1: string;
  team2: string;
  team1Score?: string;
  team2Score?: string;
  result?: string;
  tossWinner?: string;
  tossDecision?: string;
  seriesName?: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  country: string;
  apiId: string;
}

export interface Player {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  battingStyle?: string;
  bowlingStyle?: string;
  image?: string;
  country: string;
  apiId: string;
  teamId: string;
}

export interface LiveScore {
  matchId: string;
  team1: {
    name: string;
    score: string;
    wickets: number;
    overs: number;
  };
  team2: {
    name: string;
    score: string;
    wickets: number;
    overs: number;
  };
  currentBatsmen?: {
    name: string;
    runs: number;
    balls: number;
  }[];
  currentBowlers?: {
    name: string;
    overs: number;
    runs: number;
    wickets: number;
  }[];
  recentOvers: {
    over: number;
    runs: number;
    wickets: number;
    balls: string[];
  }[];
  requiredRunRate?: number;
  currentRunRate: number;
  lastUpdated: string;
}

export interface Commentary {
  id: string;
  over: number;
  ball: number;
  commentary: string;
  event: 'normal' | 'wicket' | 'boundary' | 'six' | 'four' | 'milestone';
  timestamp: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image?: string;
  url: string;
  source: string;
  publishedAt: string;
}

export interface PlayerStats {
  batting: {
    matches: number;
    innings: number;
    runs: number;
    average: number;
    strikeRate: number;
    hundreds: number;
    fifties: number;
  };
  bowling: {
    matches: number;
    innings: number;
    wickets: number;
    average: number;
    economy: number;
    bestFigures: string;
  };
}

