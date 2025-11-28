import { NextRequest, NextResponse } from 'next/server';
import { CricketClient } from '@/lib/api/cricket-client';
import { getCached, setCached, CACHE_TTL } from '@/lib/api/cache';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cacheKey = `match:${id}`;
    
    // Check cache first
    const cached = await getCached(cacheKey, CACHE_TTL.matches);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch from API
    const match = await CricketClient.getMatchById(id);

    // Cache the result
    await setCached(cacheKey, match, CACHE_TTL.matches);

    return NextResponse.json(match);
  } catch (error) {
    console.error('Error fetching match:', error);
    return NextResponse.json(
      { error: 'Failed to fetch match' },
      { status: 500 }
    );
  }
}

