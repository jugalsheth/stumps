'use client';

import { useState, useEffect, useRef } from 'react';
import { LiveScore } from '@/lib/api/types';

export function useLiveScore(matchId: string, enabled: boolean = true) {
  const [score, setScore] = useState<LiveScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled || !matchId) return;

    async function fetchLiveScore() {
      try {
        const response = await fetch(`/api/matches/${matchId}/live`);
        if (!response.ok) throw new Error('Failed to fetch live score');
        const data = await response.json();
        setScore(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    }

    fetchLiveScore();

    // Poll every 10 seconds for live matches
    intervalRef.current = setInterval(fetchLiveScore, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [matchId, enabled]);

  return { score, loading, error };
}

