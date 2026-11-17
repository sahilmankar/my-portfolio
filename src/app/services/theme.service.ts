import { Injectable, signal } from '@angular/core';

export type AppTheme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly currentTheme = signal<AppTheme>('dark');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('portfolio-theme') as AppTheme | null;
    const initial: AppTheme = saved === 'light' ? 'light' : 'dark';
    this.setTheme(initial);
  }

  toggleTheme(): void {
    const next: AppTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: AppTheme): void {
    this.currentTheme.set(theme);
    if (typeof window === 'undefined') return;

    localStorage.setItem('portfolio-theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}
