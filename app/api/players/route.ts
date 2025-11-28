import { NextRequest, NextResponse } from 'next/server';
import { CricketClient } from '@/lib/api/cricket-client';
import { getCached, setCached, CACHE_TTL } from '@/lib/api/cache';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('teamId');

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID required' },
        { status: 400 }
      );
    }

    const cacheKey = `players:team:${teamId}`;
    
    // Check cache first
    const cached = await getCached(cacheKey, CACHE_TTL.players);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch from API
    const players = await CricketClient.getPlayersByTeam(teamId);

    // Cache the result
    await setCached(cacheKey, players, CACHE_TTL.players);

    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}

