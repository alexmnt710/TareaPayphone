// src/stores/theme.ts
import { defineStore } from 'pinia'

type ThemeMode = 'light' | 'dark'

export const Theme = defineStore('theme', {
  state: () => ({
    theme: 'light' as ThemeMode
  }),
  actions: {
    detectSystemTheme() {
      const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
      if (storedTheme) {
        this.theme = storedTheme;
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.theme = prefersDark ? 'dark' : 'light';
      }
      this.applyTheme();
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme();
    },
    applyTheme() {
      localStorage.setItem('theme', this.theme);
      const htmlEl = document.documentElement;
      if (this.theme === 'dark') {
        htmlEl.classList.add('my-app-dark');
      } else {
        htmlEl.classList.remove('my-app-dark');
      }
    }
  }
})
