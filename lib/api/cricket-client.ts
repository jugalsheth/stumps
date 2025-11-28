// Cricket API client wrapper
import { Match, Team, Player, LiveScore, Commentary, NewsArticle } from './types';

const API_BASE_URL = process.env.CRICKET_API_URL || 'https://api.cricapi.com/v1';
const API_KEY = process.env.CRICKET_API_KEY || '';

class CricketAPIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'CricketAPIError';
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new CricketAPIError(
      `API request failed: ${response.statusText}`,
      response.status
    );
  }

  const data = await response.json();
  
  // Handle different API response formats
  if (data.status === 'failure') {
    throw new CricketAPIError(data.reason || 'API request failed');
  }

  return data;
}

export class CricketClient {
  // Get all matches
  static async getMatches(): Promise<Match[]> {
    try {
      const data = await fetchAPI<{ data: Match[] }>('/matches');
      return data.data || [];
    } catch (error) {
      console.error('Error fetching matches:', error);
      // Return mock data for development
      return this.getMockMatches();
    }
  }

  // Get match by ID
  static async getMatchById(matchId: string): Promise<Match> {
    try {
      const data = await fetchAPI<{ data: Match }>(`/matches/${matchId}`);
      return data.data;
    } catch (error) {
      console.error('Error fetching match:', error);
      throw error;
    }
  }

  // Get live match updates
  static async getLiveScore(matchId: string): Promise<LiveScore> {
    try {
      const data = await fetchAPI<{ data: LiveScore }>(`/matches/${matchId}/live`);
      return data.data;
    } catch (error) {
      console.error('Error fetching live score:', error);
      throw error;
    }
  }

  // Get match commentary
  static async getCommentary(matchId: string): Promise<Commentary[]> {
    try {
      const data = await fetchAPI<{ data: Commentary[] }>(`/matches/${matchId}/commentary`);
      return data.data || [];
    } catch (error) {
      console.error('Error fetching commentary:', error);
      return [];
    }
  }

  // Get all teams
  static async getTeams(): Promise<Team[]> {
    try {
      const data = await fetchAPI<{ data: Team[] }>('/teams');
      return data.data || [];
    } catch (error) {
      console.error('Error fetching teams:', error);
      return this.getMockTeams();
    }
  }

  // Get team by ID
  static async getTeamById(teamId: string): Promise<Team> {
    try {
      const data = await fetchAPI<{ data: Team }>(`/teams/${teamId}`);
      return data.data;
    } catch (error) {
      console.error('Error fetching team:', error);
      throw error;
    }
  }

  // Get players by team
  static async getPlayersByTeam(teamId: string): Promise<Player[]> {
    try {
      const data = await fetchAPI<{ data: Player[] }>(`/teams/${teamId}/players`);
      return data.data || [];
    } catch (error) {
      console.error('Error fetching players:', error);
      return [];
    }
  }

  // Get player by ID
  static async getPlayerById(playerId: string): Promise<Player> {
    try {
      const data = await fetchAPI<{ data: Player }>(`/players/${playerId}`);
      return data.data;
    } catch (error) {
      console.error('Error fetching player:', error);
      throw error;
    }
  }

  // Get news articles
  static async getNews(limit = 20): Promise<NewsArticle[]> {
    try {
      const data = await fetchAPI<{ data: NewsArticle[] }>(`/news?limit=${limit}`);
      return data.data || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return this.getMockNews();
    }
  }

  // Mock data for development
  private static getMockMatches(): Match[] {
    return [
      {
        id: '1',
        apiId: 'mock-1',
        title: 'India vs Australia',
        matchFormat: 'ODI',
        venue: 'Melbourne Cricket Ground',
        startTime: new Date(Date.now() + 86400000).toISOString(),
        status: 'Scheduled',
        team1: 'India',
        team2: 'Australia',
        seriesName: 'ODI Series 2024',
      },
      {
        id: '2',
        apiId: 'mock-2',
        title: 'England vs South Africa',
        matchFormat: 'T20',
        venue: 'Lord\'s',
        startTime: new Date(Date.now() + 172800000).toISOString(),
        status: 'Scheduled',
        team1: 'England',
        team2: 'South Africa',
        seriesName: 'T20 Series 2024',
      },
    ];
  }

  private static getMockTeams(): Team[] {
    return [
      {
        id: '1',
        apiId: 'team-ind',
        name: 'India',
        shortName: 'IND',
        country: 'India',
        logo: '/icons/teams/india.svg',
      },
      {
        id: '2',
        apiId: 'team-aus',
        name: 'Australia',
        shortName: 'AUS',
        country: 'Australia',
        logo: '/icons/teams/australia.svg',
      },
    ];
  }

  private static getMockNews(): NewsArticle[] {
    return [
      {
        id: '1',
        title: 'Cricket World Cup 2024 Updates',
        description: 'Latest updates from the Cricket World Cup',
        url: '#',
        source: 'CricInfo',
        publishedAt: new Date().toISOString(),
      },
    ];
  }
}

