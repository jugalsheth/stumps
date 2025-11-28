// Statistics calculations

export function calculateRunRate(runs: number, overs: number): number {
  if (overs === 0) return 0;
  return runs / overs;
}

export function calculateRequiredRunRate(
  runsRemaining: number,
  ballsRemaining: number
): number {
  if (ballsRemaining === 0) return 0;
  const oversRemaining = ballsRemaining / 6;
  return runsRemaining / oversRemaining;
}

export function calculateStrikeRate(runs: number, balls: number): number {
  if (balls === 0) return 0;
  return (runs / balls) * 100;
}

export function calculateAverage(runs: number, dismissals: number): number {
  if (dismissals === 0) return runs;
  return runs / dismissals;
}

export function calculateEconomyRate(runs: number, overs: number): number {
  if (overs === 0) return 0;
  return runs / overs;
}

export function calculateBowlingAverage(runs: number, wickets: number): number {
  if (wickets === 0) return runs;
  return runs / wickets;
}

export function calculatePartnership(
  runs: number,
  balls: number
): { runs: number; balls: number; runRate: number } {
  return {
    runs,
    balls,
    runRate: calculateRunRate(runs, balls / 6),
  };
}

export function calculateMatchProgress(
  totalOvers: number,
  currentOver: number
): number {
  if (totalOvers === 0) return 0;
  return (currentOver / totalOvers) * 100;
}

