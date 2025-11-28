'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, Bell } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useNotifications } from '@/lib/hooks/useNotifications';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { permission, requestPermission } = useNotifications();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">🏏</span>
            <span className="font-bold text-xl">Cricket Tracker</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="/matches" className="text-sm font-medium hover:underline">
            Matches
          </Link>
          <Link href="/teams" className="text-sm font-medium hover:underline">
            Teams
          </Link>
          <Link href="/news" className="text-sm font-medium hover:underline">
            News
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {permission !== 'granted' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={requestPermission}
              title="Enable notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/matches" className="text-lg font-medium">
                  Matches
                </Link>
                <Link href="/teams" className="text-lg font-medium">
                  Teams
                </Link>
                <Link href="/news" className="text-lg font-medium">
                  News
                </Link>
                <Link href="/settings" className="text-lg font-medium">
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

