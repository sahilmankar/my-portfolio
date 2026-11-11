import { Component } from '@angular/core';
import { EDUCATION, PROFILE_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-about-education',
  standalone: true,
  template: `
    <section id="about" class="py-12 sm:py-16 border-b border-zinc-900">
      <div class="max-w-6xl mx-auto px-5 sm:px-8">
        <div class="max-w-2xl mb-8">
          <p class="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            04 / Principles &amp; Education
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
            How I Engineer Software
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Engineering Principles Bento -->
          <div class="lg:col-span-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-semibold text-zinc-100 mb-4">Engineering Mindset</h3>
              <p class="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                {{ profile.summary }}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-4">
                  <p class="text-xs font-mono text-emerald-400 mb-1">01. Maintainability</p>
                  <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Clean Architecture, SOLID boundaries, Repository &amp; Unit of Work patterns, and resolving 100+ SonarQube quality issues.
                  </p>
                </div>
                <div class="rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-4">
                  <p class="text-xs font-mono text-emerald-400 mb-1">02. Reliability &amp; Scale</p>
                  <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Set-based SQL optimization (10m to &lt;2m), 60K+ daily biometric syncs, and offline-first SQLite/IndexedDB persistence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Education Card -->
          <div class="lg:col-span-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 mb-4">
                <span class="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-emerald-400">
                  Education
                </span>
                <span class="text-xs font-mono text-zinc-500">{{ education.period }}</span>
              </div>

              <h3 class="text-xl font-bold text-zinc-100">{{ education.degree }}</h3>
              <p class="text-sm font-medium text-zinc-300 mt-1">{{ education.institution }}</p>
              <p class="text-xs font-mono text-zinc-500 mt-1 flex items-center gap-1.5">
                <i class="fa-solid fa-location-dot"></i>
                <span>{{ education.location }}</span>
              </p>

              <div class="mt-6 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-wider text-zinc-400">Academic CGPA</span>
                <span class="text-xl font-bold font-mono text-emerald-400">{{ education.cgpa }}</span>
              </div>
            </div>

            <div class="mt-6 pt-5 border-t border-zinc-800/80 space-y-4">
              <div>
                <p class="text-xs font-mono text-zinc-500 mb-2.5">Core Coursework</p>
                <div class="flex flex-wrap gap-1.5">
                  @for (course of education.coursework; track course) {
                    <span class="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                      {{ course }}
                    </span>
                  }
                </div>
              </div>
              @if (education.languages?.length) {
                <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/60">
                  <span class="text-xs font-mono text-zinc-500">Languages:</span>
                  @for (lang of education.languages; track lang) {
                    <span class="text-xs font-mono text-zinc-300">{{ lang }}</span>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutEducationComponent {
  readonly profile = PROFILE_INFO;
  readonly education = EDUCATION;
}
