import { TeamCard } from '@/components/teams/TeamCard';
import { PlayerCard } from '@/components/players/PlayerCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Team, Player } from '@/lib/api/types';
import { notFound } from 'next/navigation';

async function getTeam(teamId: string): Promise<Team | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/teams`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const teams: Team[] = await res.json();
    return teams.find(t => t.id === teamId) || null;
  } catch (error) {
    console.error('Error fetching team:', error);
    return null;
  }
}

async function getPlayers(teamId: string): Promise<Player[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/players?teamId=${teamId}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const team = await getTeam(teamId);
  const players = await getPlayers(teamId);

  if (!team) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
        <p className="text-muted-foreground">{team.country}</p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Squad</h2>
        {players.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No players found
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}

