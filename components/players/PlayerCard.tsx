'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Player } from '@/lib/api/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link href={`/players/${player.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-4">
            {player.image ? (
              <Image
                src={player.image}
                alt={player.name}
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <Avatar className="h-16 w-16">
                <AvatarFallback>
                  {player.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1">
              <CardTitle className="text-lg">{player.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{player.role}</Badge>
                <span className="text-sm text-muted-foreground">{player.country}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            {player.battingStyle && (
              <div>
                <span className="text-muted-foreground">Batting: </span>
                <span>{player.battingStyle}</span>
              </div>
            )}
            {player.bowlingStyle && (
              <div>
                <span className="text-muted-foreground">Bowling: </span>
                <span>{player.bowlingStyle}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

