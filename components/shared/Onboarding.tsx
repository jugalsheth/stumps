'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/lib/store/userStore';
import { Team } from '@/lib/api/types';
import { Check } from 'lucide-react';

interface OnboardingProps {
  teams: Team[];
  onComplete: () => void;
}

export function Onboarding({ teams, onComplete }: OnboardingProps) {
  const { favoriteTeams, addFavoriteTeam, removeFavoriteTeam } = useUserStore();
  const [selectedTeams, setSelectedTeams] = useState<string[]>(favoriteTeams);

  const toggleTeam = (teamId: string) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleComplete = () => {
    // Update store with selected teams
    selectedTeams.forEach((teamId) => {
      if (!favoriteTeams.includes(teamId)) {
        addFavoriteTeam(teamId);
      }
    });
    favoriteTeams.forEach((teamId) => {
      if (!selectedTeams.includes(teamId)) {
        removeFavoriteTeam(teamId);
      }
    });
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Cricket Tracker! 🏏</CardTitle>
          <CardDescription>
            Select your favorite teams to personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {teams.map((team) => {
              const isSelected = selectedTeams.includes(team.id);
              return (
                <button
                  key={team.id}
                  onClick={() => toggleTeam(team.id)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{team.shortName}</span>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{team.name}</p>
                </button>
              );
            })}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onComplete}>
              Skip
            </Button>
            <Button onClick={handleComplete}>
              Continue ({selectedTeams.length} selected)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

