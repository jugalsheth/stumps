// Caching logic using Redis/Upstash
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// In-memory cache fallback for development
const memoryCache = new Map<string, { data: any; expires: number }>();

const CACHE_TTL = {
  matches: 60, // 1 minute
  liveScore: 10, // 10 seconds
  teams: 3600, // 1 hour
  players: 3600, // 1 hour
  news: 300, // 5 minutes
};

export async function getCached<T>(
  key: string,
  ttl: number = 60
): Promise<T | null> {
  try {
    // Try Redis first
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const cached = await redis.get<T>(key);
      return cached;
    }
    
    // Fallback to memory cache
    const cached = memoryCache.get(key);
    if (cached && cached.expires > Date.now()) {
      return cached.data as T;
    }
    
    return null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function setCached<T>(
  key: string,
  data: T,
  ttl: number = 60
): Promise<void> {
  try {
    // Try Redis first
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      await redis.set(key, data, { ex: ttl });
      return;
    }
    
    // Fallback to memory cache
    memoryCache.set(key, {
      data,
      expires: Date.now() + ttl * 1000,
    });
    
    // Clean up expired entries periodically
    if (memoryCache.size > 1000) {
      const now = Date.now();
      for (const [k, v] of memoryCache.entries()) {
        if (v.expires <= now) {
          memoryCache.delete(k);
        }
      }
    }
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      // Redis pattern deletion
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } else {
      // Memory cache pattern deletion
      for (const key of memoryCache.keys()) {
        if (key.includes(pattern)) {
          memoryCache.delete(key);
        }
      }
    }
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
}

export { CACHE_TTL };

