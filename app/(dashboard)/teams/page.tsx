import { TeamCard } from '@/components/teams/TeamCard';
import { Team } from '@/lib/api/types';

async function getTeams(): Promise<Team[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/teams`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch teams');
    return res.json();
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
}

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Teams</h1>
        <p className="text-muted-foreground">
          Explore cricket teams and their statistics
        </p>
      </div>

      {teams.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No teams found
        </div>
      )}
    </div>
  );
}

