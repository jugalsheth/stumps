// Formatting utilities
import { format, formatDistance, formatRelative } from 'date-fns';

export function formatDate(date: string | Date, formatStr: string = 'PPp'): string {
  return format(new Date(date), formatStr);
}

export function formatRelativeTime(date: string | Date): string {
  return formatRelative(new Date(date), new Date());
}

export function formatDistanceTime(date: string | Date): string {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

export function formatScore(score: string | undefined): string {
  if (!score) return '-';
  return score;
}

export function formatRunRate(runRate: number): string {
  return runRate.toFixed(2);
}

export function formatOvers(overs: number): string {
  const whole = Math.floor(overs);
  const fraction = Math.round((overs - whole) * 6);
  return `${whole}.${fraction}`;
}

export function formatPlayerName(name: string): string {
  // Handle common name formats
  return name.trim();
}

export function formatTeamName(name: string): string {
  return name.trim();
}

export function formatMatchStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

