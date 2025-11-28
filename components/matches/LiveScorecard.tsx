'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiveScore } from '@/lib/api/types';
import { formatRunRate, formatOvers } from '@/lib/utils/format';
import { useLiveScore } from '@/lib/hooks/useLiveScore';
import { Skeleton } from '@/components/ui/skeleton';

interface LiveScorecardProps {
  matchId: string;
}

export function LiveScorecard({ matchId }: LiveScorecardProps) {
  const { score, loading } = useLiveScore(matchId, true);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!score) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No live score available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live Scorecard</CardTitle>
          <Badge variant="destructive" className="animate-pulse">
            LIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scorecard">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
            <TabsTrigger value="commentary">Commentary</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scorecard" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{score.team1.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{score.team1.score}</div>
                    <div className="text-sm text-muted-foreground">
                      {score.team1.wickets} wickets • {formatOvers(score.team1.overs)} overs
                    </div>
                  </div>
                </div>
                {score.currentBatsmen && score.currentBatsmen.length > 0 && (
                  <div className="mt-4 space-y-2 border-t pt-2">
                    <div className="text-sm font-medium">Batting:</div>
                    {score.currentBatsmen.map((batsman, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{batsman.name}</span>
                        <span>{batsman.runs} ({batsman.balls})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{score.team2.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{score.team2.score}</div>
                    <div className="text-sm text-muted-foreground">
                      {score.team2.wickets} wickets • {formatOvers(score.team2.overs)} overs
                    </div>
                  </div>
                </div>
                {score.currentBowlers && score.currentBowlers.length > 0 && (
                  <div className="mt-4 space-y-2 border-t pt-2">
                    <div className="text-sm font-medium">Bowling:</div>
                    {score.currentBowlers.map((bowler, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{bowler.name}</span>
                        <span>{formatOvers(bowler.overs)}-{bowler.runs}-{bowler.wickets}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current RR: </span>
                  <span className="font-medium">{formatRunRate(score.currentRunRate)}</span>
                </div>
                {score.requiredRunRate && (
                  <div>
                    <span className="text-muted-foreground">Required RR: </span>
                    <span className="font-medium">{formatRunRate(score.requiredRunRate)}</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="commentary" className="mt-4">
            <div className="text-center text-muted-foreground py-8">
              Commentary will be displayed here
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <div className="text-center text-muted-foreground py-8">
              Match statistics will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

