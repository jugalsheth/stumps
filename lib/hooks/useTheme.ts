'use client';

import { useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { useUserStore } from '@/lib/store/userStore';

export function useTheme() {
  const { theme: userTheme, setTheme: setUserTheme } = useUserStore();
  const { theme, setTheme, systemTheme } = useNextTheme();

  useEffect(() => {
    if (userTheme === 'system') {
      setTheme('system');
    } else {
      setTheme(userTheme);
    }
  }, [userTheme, setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setUserTheme(newTheme);
  };

  return {
    theme: theme === 'system' ? systemTheme : theme,
    setTheme: setUserTheme,
    toggleTheme,
    systemTheme,
  };
}

