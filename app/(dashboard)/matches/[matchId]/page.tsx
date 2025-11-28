import { LiveScorecard } from '@/components/matches/LiveScorecard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Match } from '@/lib/api/types';
import { formatDate, formatDistanceTime } from '@/lib/utils/format';
import { MapPin, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getMatch(matchId: string): Promise<Match | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/matches/${matchId}`,
      { next: { revalidate: 10 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching match:', error);
    return null;
  }
}

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  const match = await getMatch(matchId);

  if (!match) {
    notFound();
  }

  const isLive = match.status === 'Live';
  const isUpcoming = match.status === 'Scheduled';

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-4xl font-bold">{match.title}</h1>
          {isLive && (
            <Badge variant="destructive" className="animate-pulse">
              LIVE
            </Badge>
          )}
          {isUpcoming && <Badge variant="secondary">Upcoming</Badge>}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{match.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{formatDate(match.startTime, 'PPp')}</span>
          </div>
          {match.seriesName && (
            <Badge variant="outline">{match.seriesName}</Badge>
          )}
          <Badge variant="outline">{match.matchFormat}</Badge>
        </div>
      </div>

      {isLive && (
        <LiveScorecard matchId={matchId} />
      )}

      {isUpcoming && (
        <Card>
          <CardHeader>
            <CardTitle>Match Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Starts in</p>
              <p className="text-lg font-semibold">
                {formatDistanceTime(match.startTime)}
              </p>
            </div>
            {match.tossWinner && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Toss</p>
                <p className="text-lg">
                  {match.tossWinner} won the toss and chose to {match.tossDecision}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {match.status === 'Completed' && match.result && (
        <Card>
          <CardHeader>
            <CardTitle>Match Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{match.result}</p>
            {match.team1Score && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{match.team1}</span>
                  <span className="font-bold">{match.team1Score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{match.team2}</span>
                  <span className="font-bold">{match.team2Score}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

