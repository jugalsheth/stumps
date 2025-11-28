import { NextResponse } from 'next/server';
import { CricketClient } from '@/lib/api/cricket-client';
import { getCached, setCached, CACHE_TTL } from '@/lib/api/cache';

export const runtime = 'edge';

export async function GET() {
  try {
    const cacheKey = 'matches:all';
    
    // Check cache first
    const cached = await getCached(cacheKey, CACHE_TTL.matches);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch from API
    const matches = await CricketClient.getMatches();

    // Cache the result
    await setCached(cacheKey, matches, CACHE_TTL.matches);

    return NextResponse.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}

