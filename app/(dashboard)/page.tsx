import { MatchCard } from '@/components/matches/MatchCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMatches } from '@/lib/hooks/useMatches';
import { Match } from '@/lib/api/types';
import { Suspense } from 'react';

async function getMatches(): Promise<Match[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/matches`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch matches');
    return res.json();
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

export default async function DashboardPage() {
  const matches = await getMatches();
  
  const liveMatches = matches.filter(m => m.status === 'Live');
  const upcomingMatches = matches.filter(m => m.status === 'Scheduled').slice(0, 5);
  const recentMatches = matches.filter(m => m.status === 'Completed').slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Stumps</h1>
        <p className="text-muted-foreground">
          Stay updated with live scores, match updates, and cricket news
        </p>
      </div>

      {liveMatches.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Live Matches</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Matches</h2>
        {upcomingMatches.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No upcoming matches
            </CardContent>
          </Card>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Results</h2>
        {recentMatches.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No recent matches
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}

