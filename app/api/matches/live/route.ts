import { NextRequest, NextResponse } from 'next/server';
import { CricketClient } from '@/lib/api/cricket-client';
import { getCached, setCached, CACHE_TTL } from '@/lib/api/cache';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const matchId = searchParams.get('matchId');

    if (!matchId) {
      return NextResponse.json(
        { error: 'Match ID required' },
        { status: 400 }
      );
    }

    const cacheKey = `match:${matchId}:live`;
    
    // Check cache first
    const cached = await getCached(cacheKey, CACHE_TTL.liveScore);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch from API
    const liveScore = await CricketClient.getLiveScore(matchId);

    // Cache the result
    await setCached(cacheKey, liveScore, CACHE_TTL.liveScore);

    return NextResponse.json(liveScore);
  } catch (error) {
    console.error('Error fetching live score:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live score' },
      { status: 500 }
    );
  }
}

