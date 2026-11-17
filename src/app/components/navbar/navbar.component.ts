import { Component, HostListener, inject, signal } from '@angular/core';
import { PROFILE_INFO } from '../../data/portfolio.data';
import { ThemeService } from '../../services/theme.service';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class]="
        isScrolled()
          ? 'bg-[#faf8f5]/90 dark:bg-[#111113]/90 backdrop-blur-md border-b border-[#e8e4dc]/90 dark:border-zinc-800 shadow-xs dark:shadow-md dark:shadow-black/30'
          : 'bg-transparent'
      "
    >
      <nav class="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 h-16 flex items-center justify-between">
        <!-- Brand -->
        <a
          href="#home"
          (click)="navigate($event, 'home')"
          class="flex items-center gap-2.5 group focus:outline-none"
        >
          <span
            class="w-8 h-8 rounded-lg bg-[#eef2ff] dark:bg-zinc-900 border border-[#c7d2fe] dark:border-zinc-800 flex items-center justify-center font-mono text-xs font-bold text-[#1e3a8a] dark:text-orange-400 group-hover:border-[#1e3a8a] dark:group-hover:border-orange-500/60 transition-colors shadow-xs"
          >
            SM
          </span>
          <span class="text-sm sm:text-base font-bold tracking-tight text-[#0f172a] dark:text-zinc-100 group-hover:text-[#1e3a8a] dark:group-hover:text-white transition-colors">
            {{ profile.name }}
          </span>
        </a>

        <!-- Desktop Links -->
        <ul class="hidden md:flex items-center gap-1">
          @for (link of navLinks; track link.id) {
            <li>
              <a
                [href]="'#' + link.id"
                (click)="navigate($event, link.id)"
                class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                [class.text-[#1e3a8a]]="activeSection() === link.id && themeService.currentTheme() === 'light'"
                [class.bg-[#eef2ff]]="activeSection() === link.id && themeService.currentTheme() === 'light'"
                [class.text-orange-400]="activeSection() === link.id && themeService.currentTheme() === 'dark'"
                [class.bg-zinc-850]="activeSection() === link.id && themeService.currentTheme() === 'dark'"
                [class.text-[#475569]]="activeSection() !== link.id"
                [class.dark:text-zinc-400]="activeSection() !== link.id"
                [class.hover:text-[#0f172a]]="activeSection() !== link.id"
                [class.dark:hover:text-white]="activeSection() !== link.id"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <!-- Desktop CTA + Theme Toggle -->
        <div class="hidden md:flex items-center gap-2.5">
          <!-- 1-Click Theme Switcher -->
          <button
            type="button"
            (click)="themeService.toggleTheme()"
            class="h-9 px-2.5 rounded-lg border border-[#e8e4dc] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors hover:border-[#cbd5e1] dark:hover:border-zinc-700 shadow-xs"
            [attr.title]="
              themeService.currentTheme() === 'dark'
                ? 'Switch to Warm Ivory & Navy (Light Mode)'
                : 'Switch to Black & Orange (Dark Mode)'
            "
          >
            @if (themeService.currentTheme() === 'dark') {
              <i class="fa-solid fa-sun text-orange-400 text-sm"></i>
              <span class="text-zinc-300">Light</span>
            } @else {
              <i class="fa-solid fa-moon text-[#1e3a8a] text-sm"></i>
              <span class="text-[#0f172a]">Dark</span>
            }
          </button>

          <a
            [href]="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            class="w-9 h-9 rounded-lg border border-[#e8e4dc] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-[#475569] dark:text-zinc-400 hover:text-[#0f172a] dark:hover:text-white hover:border-[#cbd5e1] dark:hover:border-zinc-700 transition-colors shadow-xs"
          >
            <i class="fa-brands fa-github text-sm"></i>
          </a>

          <a
            [href]="profile.resumeUrl"
            [attr.download]="profile.resumeFileName"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#c7d2fe] dark:border-orange-500/40 bg-[#eef2ff] dark:bg-orange-500/10 text-[#1e3a8a] dark:text-orange-300 text-sm font-semibold hover:bg-[#e0e7ff] dark:hover:bg-orange-500/20 transition-colors shadow-xs"
          >
            <i class="fa-solid fa-file-arrow-down text-xs"></i>
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            (click)="navigate($event, 'contact')"
            class="px-4 py-2 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] dark:bg-orange-500 dark:hover:bg-orange-400 text-white dark:text-zinc-950 text-sm font-bold transition-colors shadow-sm"
          >
            Let's Talk
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="md:hidden flex items-center gap-2">
          <button
            type="button"
            (click)="themeService.toggleTheme()"
            class="w-9 h-9 rounded-lg border border-[#e8e4dc] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-sm shadow-xs"
            [attr.aria-label]="
              themeService.currentTheme() === 'dark'
                ? 'Switch to Warm Ivory & Navy'
                : 'Switch to Black & Orange'
            "
          >
            @if (themeService.currentTheme() === 'dark') {
              <i class="fa-solid fa-sun text-orange-400"></i>
            } @else {
              <i class="fa-solid fa-moon text-[#1e3a8a]"></i>
            }
          </button>

          <button
            type="button"
            class="w-9 h-9 rounded-lg border border-[#e8e4dc] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-[#0f172a] dark:text-zinc-200"
            [attr.aria-expanded]="isMenuOpen()"
            aria-label="Toggle navigation menu"
            (click)="toggleMenu()"
          >
            <i class="fa-solid" [class.fa-bars]="!isMenuOpen()" [class.fa-xmark]="isMenuOpen()"></i>
          </button>
        </div>
      </nav>

      <!-- Mobile Drawer -->
      @if (isMenuOpen()) {
        <div class="md:hidden bg-[#faf8f5]/98 dark:bg-[#111113]/98 backdrop-blur-lg border-b border-[#e8e4dc] dark:border-zinc-800 animate-fade-in shadow-xl">
          <ul class="w-full max-w-[1720px] mx-auto px-6 sm:px-10 py-4 space-y-1">
            @for (link of navLinks; track link.id) {
              <li>
                <a
                  [href]="'#' + link.id"
                  (click)="navigate($event, link.id)"
                  class="block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  [class.bg-[#eef2ff]]="activeSection() === link.id && themeService.currentTheme() === 'light'"
                  [class.text-[#1e3a8a]]="activeSection() === link.id && themeService.currentTheme() === 'light'"
                  [class.bg-zinc-850]="activeSection() === link.id && themeService.currentTheme() === 'dark'"
                  [class.text-orange-400]="activeSection() === link.id && themeService.currentTheme() === 'dark'"
                  [class.text-[#334155]]="activeSection() !== link.id"
                  [class.dark:text-zinc-300]="activeSection() !== link.id"
                >
                  {{ link.label }}
                </a>
              </li>
            }
            <li class="pt-2">
              <a
                [href]="profile.resumeUrl"
                [attr.download]="profile.resumeFileName"
                target="_blank"
                rel="noopener noreferrer"
                (click)="isMenuOpen.set(false)"
                class="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-[#c7d2fe] dark:border-orange-500/40 bg-[#eef2ff] dark:bg-orange-500/15 text-[#1e3a8a] dark:text-orange-300 text-sm font-semibold"
              >
                <i class="fa-solid fa-file-arrow-down text-xs"></i>
                <span>Download Resume (PDF)</span>
              </a>
            </li>
          </ul>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  readonly profile = PROFILE_INFO;
  readonly themeService = inject(ThemeService);
  readonly isMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly activeSection = signal('home');

  readonly navLinks: NavLink[] = [
    { id: 'home', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Stack' },
    { id: 'about', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 24);
    const scrollPos = window.scrollY + 140;
    for (let i = this.navLinks.length - 1; i >= 0; i--) {
      const el = document.getElementById(this.navLinks[i].id);
      if (el && el.offsetTop <= scrollPos) {
        this.activeSection.set(this.navLinks[i].id);
        break;
      }
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  navigate(event: Event, sectionId: string): void {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection.set(sectionId);
    }
    this.isMenuOpen.set(false);
  }
}
