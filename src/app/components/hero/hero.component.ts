import { Component, signal } from '@angular/core';
import { HERO_METRICS, PROFILE_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section
      id="home"
      class="relative pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden border-b border-zinc-900 bg-grid-pattern"
    >
      <!-- Subtle top spotlight -->
      <div
        class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[48rem] h-[24rem] rounded-full bg-emerald-500/10 blur-[120px]"
      ></div>

      <div class="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Column: Executive Summary -->
          <div class="lg:col-span-7 space-y-6">
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{{ profile.availabilityText }}</span>
            </div>

            <div class="space-y-4">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-50 leading-[1.1]">
                {{ profile.name }}
                <span class="block text-zinc-400 font-semibold mt-1 text-2xl sm:text-3xl lg:text-4xl">
                  {{ profile.role }} · .NET &amp; Angular
                </span>
              </h1>
              <p class="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
                {{ profile.summary }}
              </p>
            </div>

            <!-- Action Row -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                (click)="scrollTo($event, 'projects')"
                class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 text-zinc-950 text-sm font-semibold hover:bg-white transition-all shadow-sm"
              >
                <span>Explore Projects</span>
                <i class="fa-solid fa-arrow-down text-xs"></i>
              </a>

              <a
                [href]="profile.resumeUrl"
                [attr.download]="profile.resumeFileName"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-sm font-semibold hover:bg-emerald-500/25 hover:border-emerald-400/60 transition-all"
              >
                <i class="fa-solid fa-file-arrow-down text-xs"></i>
                <span>Download CV</span>
              </a>

              <button
                type="button"
                (click)="copyEmail()"
                class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm font-medium hover:border-zinc-700 hover:bg-zinc-800/80 transition-all"
              >
                <i
                  class="fa-regular"
                  [class.fa-copy]="!emailCopied()"
                  [class.fa-check]="emailCopied()"
                  [class.text-emerald-400]="emailCopied()"
                ></i>
                <span>{{ emailCopied() ? 'Email Copied!' : profile.email }}</span>
              </button>

              <div class="flex items-center gap-2 ml-auto sm:ml-2">
                <a
                  [href]="profile.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  class="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  <i class="fa-brands fa-github text-base"></i>
                </a>
                <a
                  [href]="profile.linkedinUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  class="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  <i class="fa-brands fa-linkedin-in text-base"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Right Column: Architectural Profile Card -->
          <div class="lg:col-span-5">
            <div class="rounded-2xl bg-zinc-900/75 border border-zinc-800/90 p-6 sm:p-7 shadow-2xl backdrop-blur-sm">
              <div class="flex items-center gap-4 pb-6 border-b border-zinc-800/80">
                <img
                  [src]="profile.avatarUrl"
                  [alt]="profile.name"
                  class="w-16 h-16 rounded-2xl object-cover border border-zinc-700/80 bg-zinc-800"
                />
                <div class="min-w-0">
                  <h2 class="text-lg font-semibold text-zinc-100 truncate">{{ profile.name }}</h2>
                  <p class="text-sm text-emerald-400 font-mono">{{ profile.role }}</p>
                  <p class="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
                    <i class="fa-solid fa-location-dot text-[11px]"></i>
                    <span>{{ profile.location }}</span>
                  </p>
                </div>
              </div>

              <div class="pt-5 space-y-3">
                <p class="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  Core Engineering Focus
                </p>
                <ul class="space-y-2.5">
                  @for (focus of profile.engineeringFocus; track focus) {
                    <li class="flex items-start gap-2.5 text-sm text-zinc-300">
                      <i class="fa-solid fa-terminal text-emerald-400 text-[11px] mt-1.5"></i>
                      <span>{{ focus }}</span>
                    </li>
                  }
                </ul>
              </div>

              <div class="mt-6 pt-5 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Primary Stack</span>
                <span class="text-zinc-200">C# · .NET 8 · Angular · SQL</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Impact Metrics Strip -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          @for (metric of metrics; track metric.label) {
            <div class="rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-5 hover:border-zinc-700/80 transition-colors">
              <div class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-mono">
                {{ metric.value }}
              </div>
              <div class="text-sm font-medium text-zinc-200 mt-1">{{ metric.label }}</div>
              <div class="text-xs text-zinc-500 mt-0.5">{{ metric.sublabel }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  readonly profile = PROFILE_INFO;
  readonly metrics = HERO_METRICS;
  readonly emailCopied = signal(false);

  scrollTo(event: Event, id: string): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 2200);
    } catch {
      window.location.href = `mailto:${this.profile.email}`;
    }
  }
}
