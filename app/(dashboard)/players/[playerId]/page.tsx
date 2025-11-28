import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Player } from '@/lib/api/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

async function getPlayer(playerId: string): Promise<Player | null> {
  try {
    // In a real app, you'd have a dedicated player API endpoint
    // For now, we'll return null as this would require fetching from teams
    return null;
  } catch (error) {
    console.error('Error fetching player:', error);
    return null;
  }
}

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = await params;
  const player = await getPlayer(playerId);

  if (!player) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        {player.image ? (
          <Image
            src={player.image}
            alt={player.name}
            width={128}
            height={128}
            className="rounded-full"
          />
        ) : (
          <Avatar className="h-32 w-32">
            <AvatarFallback className="text-2xl">
              {player.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        )}
        <div>
          <h1 className="text-4xl font-bold mb-2">{player.name}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{player.role}</Badge>
            <span className="text-muted-foreground">{player.country}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Batting</CardTitle>
          </CardHeader>
          <CardContent>
            {player.battingStyle && (
              <div>
                <p className="text-sm text-muted-foreground">Style</p>
                <p className="font-medium">{player.battingStyle}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bowling</CardTitle>
          </CardHeader>
          <CardContent>
            {player.bowlingStyle && (
              <div>
                <p className="text-sm text-muted-foreground">Style</p>
                <p className="font-medium">{player.bowlingStyle}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

