import { Component, HostListener, signal } from '@angular/core';
import { PROFILE_INFO } from '../../data/portfolio.data';

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
      [class]="isScrolled() ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80' : 'bg-transparent'"
    >
      <nav class="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <!-- Brand -->
        <a
          href="#home"
          (click)="navigate($event, 'home')"
          class="flex items-center gap-2.5 group focus:outline-none"
        >
          <span
            class="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs font-semibold text-emerald-400 group-hover:border-emerald-500/50 transition-colors"
          >
            SM
          </span>
          <span class="text-sm sm:text-base font-semibold tracking-tight text-zinc-100">
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
                [class.text-zinc-100]="activeSection() === link.id"
                [class.bg-zinc-900]="activeSection() === link.id"
                [class.text-zinc-400]="activeSection() !== link.id"
                [class.hover:text-zinc-100]="activeSection() !== link.id"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <!-- Desktop CTA -->
        <div class="hidden md:flex items-center gap-2.5">
          <a
            [href]="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            class="w-9 h-9 rounded-lg border border-zinc-800 bg-zinc-900/70 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors"
          >
            <i class="fa-brands fa-github text-sm"></i>
          </a>
          <a
            [href]="profile.resumeUrl"
            [attr.download]="profile.resumeFileName"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-emerald-500/35 bg-emerald-500/10 text-emerald-300 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-400/60 transition-colors"
          >
            <i class="fa-solid fa-file-arrow-down text-xs"></i>
            <span>Resume</span>
          </a>
          <a
            href="#contact"
            (click)="navigate($event, 'contact')"
            class="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 text-sm font-semibold hover:bg-white transition-colors"
          >
            Let's Talk
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          type="button"
          class="md:hidden w-10 h-10 rounded-lg border border-zinc-800 bg-zinc-900/70 flex items-center justify-center text-zinc-300 hover:text-white"
          [attr.aria-expanded]="isMenuOpen()"
          aria-label="Toggle navigation menu"
          (click)="toggleMenu()"
        >
          <i class="fa-solid" [class.fa-bars]="!isMenuOpen()" [class.fa-xmark]="isMenuOpen()"></i>
        </button>
      </nav>

      <!-- Mobile Drawer -->
      @if (isMenuOpen()) {
        <div class="md:hidden bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800 animate-fade-in">
          <ul class="max-w-6xl mx-auto px-5 py-4 space-y-1">
            @for (link of navLinks; track link.id) {
              <li>
                <a
                  [href]="'#' + link.id"
                  (click)="navigate($event, link.id)"
                  class="block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  [class.bg-zinc-900]="activeSection() === link.id"
                  [class.text-emerald-400]="activeSection() === link.id"
                  [class.text-zinc-300]="activeSection() !== link.id"
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
                class="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-emerald-500/35 bg-emerald-500/10 text-emerald-300 text-sm font-semibold"
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
