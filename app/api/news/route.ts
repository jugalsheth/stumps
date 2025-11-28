import { NextRequest, NextResponse } from 'next/server';
import { CricketClient } from '@/lib/api/cricket-client';
import { getCached, setCached, CACHE_TTL } from '@/lib/api/cache';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');

    const cacheKey = `news:${limit}`;
    
    // Check cache first
    const cached = await getCached(cacheKey, CACHE_TTL.news);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch from API
    const news = await CricketClient.getNews(limit);

    // Cache the result
    await setCached(cacheKey, news, CACHE_TTL.news);

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

