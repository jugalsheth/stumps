'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store/userStore';
import { useNotifications } from '@/lib/hooks/useNotifications';
import { useTheme } from '@/lib/hooks/useTheme';

export default function SettingsPage() {
  const {
    favoriteTeams,
    notifications,
    updateNotificationSettings,
    reset,
  } = useUserStore();
  
  const { permission, requestPermission } = useNotifications();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your preferences and notification settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
              >
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('dark')}
              >
                Dark
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('system')}
              >
                System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {permission !== 'granted' && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm mb-2">
                Enable browser notifications to receive match updates
              </p>
              <Button onClick={requestPermission} size="sm">
                Enable Notifications
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="match-start">Match Start</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when matches start
              </p>
            </div>
            <Switch
              id="match-start"
              checked={notifications.matchStart}
              onCheckedChange={(checked) =>
                updateNotificationSettings({ matchStart: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="live-updates">Live Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get live score updates
              </p>
            </div>
            <Switch
              id="live-updates"
              checked={notifications.liveUpdates}
              onCheckedChange={(checked) =>
                updateNotificationSettings({ liveUpdates: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="critical-moments">Critical Moments</Label>
              <p className="text-sm text-muted-foreground">
                Get notified of wickets, milestones, etc.
              </p>
            </div>
            <Switch
              id="critical-moments"
              checked={notifications.criticalMoments}
              onCheckedChange={(checked) =>
                updateNotificationSettings({ criticalMoments: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="match-results">Match Results</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when matches end
              </p>
            </div>
            <Switch
              id="match-results"
              checked={notifications.matchResults}
              onCheckedChange={(checked) =>
                updateNotificationSettings({ matchResults: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="news-alerts">News Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified of important news
              </p>
            </div>
            <Switch
              id="news-alerts"
              checked={notifications.newsAlerts}
              onCheckedChange={(checked) =>
                updateNotificationSettings({ newsAlerts: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data</CardTitle>
          <CardDescription>Manage your stored data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Favorite Teams: {favoriteTeams.length}
              </p>
            </div>
            <Button variant="destructive" onClick={reset}>
              Reset All Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

