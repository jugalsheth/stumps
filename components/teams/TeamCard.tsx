'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Team } from '@/lib/api/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link href={`/teams/${team.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-4">
            {team.logo ? (
              <Image
                src={team.logo}
                alt={team.name}
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <Avatar className="h-16 w-16">
                <AvatarFallback>{team.shortName}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <CardTitle>{team.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{team.country}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{team.shortName}</span>
            <span className="text-xs text-muted-foreground">View Details →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

