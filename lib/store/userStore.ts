// Zustand store for user preferences
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  favoriteTeams: string[];
  favoritePlayers: string[];
  theme: 'light' | 'dark' | 'system';
  notifications: {
    matchStart: boolean;
    liveUpdates: boolean;
    criticalMoments: boolean;
    matchResults: boolean;
    newsAlerts: boolean;
  };
}

interface UserStore extends UserPreferences {
  setFavoriteTeams: (teams: string[]) => void;
  addFavoriteTeam: (teamId: string) => void;
  removeFavoriteTeam: (teamId: string) => void;
  setFavoritePlayers: (players: string[]) => void;
  addFavoritePlayer: (playerId: string) => void;
  removeFavoritePlayer: (playerId: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  updateNotificationSettings: (settings: Partial<UserPreferences['notifications']>) => void;
  reset: () => void;
}

const defaultPreferences: UserPreferences = {
  favoriteTeams: [],
  favoritePlayers: [],
  theme: 'system',
  notifications: {
    matchStart: true,
    liveUpdates: true,
    criticalMoments: true,
    matchResults: true,
    newsAlerts: false,
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      setFavoriteTeams: (teams) => set({ favoriteTeams: teams }),
      addFavoriteTeam: (teamId) =>
        set((state) => ({
          favoriteTeams: [...state.favoriteTeams, teamId],
        })),
      removeFavoriteTeam: (teamId) =>
        set((state) => ({
          favoriteTeams: state.favoriteTeams.filter((id) => id !== teamId),
        })),
      setFavoritePlayers: (players) => set({ favoritePlayers: players }),
      addFavoritePlayer: (playerId) =>
        set((state) => ({
          favoritePlayers: [...state.favoritePlayers, playerId],
        })),
      removeFavoritePlayer: (playerId) =>
        set((state) => ({
          favoritePlayers: state.favoritePlayers.filter((id) => id !== playerId),
        })),
      setTheme: (theme) => set({ theme }),
      updateNotificationSettings: (settings) =>
        set((state) => ({
          notifications: { ...state.notifications, ...settings },
        })),
      reset: () => set(defaultPreferences),
    }),
    {
      name: 'cricket-tracker-preferences',
    }
  )
);

