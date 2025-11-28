import { MatchCard } from '@/components/matches/MatchCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { Match } from '@/lib/api/types';

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

export default async function MatchesPage() {
  const matches = await getMatches();

  const liveMatches = matches.filter(m => m.status === 'Live');
  const scheduledMatches = matches.filter(m => m.status === 'Scheduled');
  const completedMatches = matches.filter(m => m.status === 'Completed');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">All Matches</h1>
        <p className="text-muted-foreground">
          View all cricket matches - live, upcoming, and completed
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

      {scheduledMatches.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Scheduled Matches</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scheduledMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {completedMatches.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Completed Matches</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {matches.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No matches found
        </div>
      )}
    </div>
  );
}

