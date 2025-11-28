import { NextResponse } from 'next/server';
import { CricketClient } from '@/lib/api/cricket-client';
import { getCached, setCached, CACHE_TTL } from '@/lib/api/cache';

export const runtime = 'edge';

export async function GET() {
  try {
    const cacheKey = 'teams:all';
    
    // Check cache first
    const cached = await getCached(cacheKey, CACHE_TTL.teams);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch from API
    const teams = await CricketClient.getTeams();

    // Cache the result
    await setCached(cacheKey, teams, CACHE_TTL.teams);

    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}

