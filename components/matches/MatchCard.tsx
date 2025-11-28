'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Match } from '@/lib/api/types';
import { formatDate, formatDistanceTime } from '@/lib/utils/format';
import { Clock, MapPin } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isLive = match.status === 'Live';
  const isUpcoming = match.status === 'Scheduled';
  const isCompleted = match.status === 'Completed';

  return (
    <Link href={`/matches/${match.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{match.title}</CardTitle>
            {isLive && (
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            )}
            {isUpcoming && (
              <Badge variant="secondary">Upcoming</Badge>
            )}
            {isCompleted && (
              <Badge variant="outline">Completed</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{match.venue}</span>
          </div>
          
          {match.seriesName && (
            <div className="text-sm font-medium text-muted-foreground">
              {match.seriesName}
            </div>
          )}

          {isLive && (match.team1Score || match.team2Score) && (
            <div className="space-y-2 pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">{match.team1}</span>
                <span className="font-bold">{match.team1Score || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">{match.team2}</span>
                <span className="font-bold">{match.team2Score || '-'}</span>
              </div>
            </div>
          )}

          {isCompleted && match.result && (
            <div className="pt-2 border-t">
              <p className="text-sm font-medium">{match.result}</p>
            </div>
          )}

          {isUpcoming && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
              <Clock className="h-4 w-4" />
              <span>{formatDistanceTime(match.startTime)}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="outline">{match.matchFormat}</Badge>
            <span>{formatDate(match.startTime, 'PPp')}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

