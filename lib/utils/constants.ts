// Constants

export const MATCH_FORMATS = ['Test', 'ODI', 'T20', 'T10'] as const;

export const MATCH_STATUS = ['Scheduled', 'Live', 'Completed', 'Abandoned'] as const;

export const PLAYER_ROLES = [
  'Batsman',
  'Bowler',
  'All-rounder',
  'Wicket-keeper',
] as const;

export const TEAM_COLORS: Record<string, { primary: string; secondary: string }> = {
  India: { primary: '#1E88E5', secondary: '#FF6F00' },
  Australia: { primary: '#FFD700', secondary: '#0066CC' },
  England: { primary: '#C8102E', secondary: '#132257' },
  'South Africa': { primary: '#007A4D', secondary: '#FFB612' },
  Pakistan: { primary: '#006600', secondary: '#FFFFFF' },
  'New Zealand': { primary: '#000000', secondary: '#FFFFFF' },
  'Sri Lanka': { primary: '#FFB500', secondary: '#003478' },
  Bangladesh: { primary: '#006A4E', secondary: '#F42A41' },
  'West Indies': { primary: '#7B2F2F', secondary: '#FFD700' },
  Afghanistan: { primary: '#000000', secondary: '#009639' },
};

export const NOTIFICATION_TYPES = {
  MATCH_START: 'match_start',
  LIVE_UPDATE: 'live_update',
  CRITICAL_MOMENT: 'critical_moment',
  MATCH_RESULT: 'match_result',
  NEWS_ALERT: 'news_alert',
} as const;

export const REFRESH_INTERVALS = {
  LIVE_MATCH: 10000, // 10 seconds
  SCHEDULED_MATCH: 60000, // 1 minute
  NEWS: 300000, // 5 minutes
} as const;

