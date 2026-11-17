import { Component } from '@angular/core';
import { EDUCATION, PROFILE_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-about-education',
  standalone: true,
  template: `
    <section id="about" class="py-12 sm:py-16 border-b border-[#e8e4dc] dark:border-zinc-850 transition-colors duration-200">
      <div class="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        <div class="max-w-2xl mb-8">
          <p class="text-xs font-mono uppercase tracking-widest text-[#1e3a8a] dark:text-orange-400 font-semibold mb-2">
            04 / Principles &amp; Background
          </p>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] dark:text-zinc-50">
            How I Engineer Software
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <!-- Engineering Principles Bento -->
          <div class="lg:col-span-7 rounded-2xl bg-white dark:bg-zinc-900/60 border border-[#e8e4dc] dark:border-zinc-800 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <h3 class="text-lg font-bold text-[#0f172a] dark:text-zinc-100 mb-3">Engineering Mindset</h3>
              <p class="text-sm sm:text-base text-[#475569] dark:text-zinc-300 leading-relaxed mb-6 font-normal">
                {{ profile.summary }}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl bg-[#faf8f5] dark:bg-zinc-950/70 border border-[#e8e4dc] dark:border-zinc-800 p-4">
                  <p class="text-xs font-mono text-[#1e3a8a] dark:text-orange-400 font-bold mb-1">01. Maintainability</p>
                  <p class="text-xs sm:text-sm text-[#475569] dark:text-zinc-300 leading-relaxed">
                    Clean Architecture, SOLID boundaries, Repository &amp; Unit of Work patterns, and resolving 100+ SonarQube quality issues.
                  </p>
                </div>
                <div class="rounded-xl bg-[#faf8f5] dark:bg-zinc-950/70 border border-[#e8e4dc] dark:border-zinc-800 p-4">
                  <p class="text-xs font-mono text-[#1e3a8a] dark:text-orange-400 font-bold mb-1">02. Reliability &amp; Scale</p>
                  <p class="text-xs sm:text-sm text-[#475569] dark:text-zinc-300 leading-relaxed">
                    Set-based SQL optimization (10m to &lt;2m), 60K+ daily biometric syncs, and zero-loss offline-first SQLite/IndexedDB persistence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Education Card -->
          <div class="lg:col-span-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-[#e8e4dc] dark:border-zinc-800 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div class="flex items-center justify-between gap-2 mb-4">
                <span class="px-2.5 py-1 rounded-md bg-[#f4f0ea] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 text-xs font-mono font-semibold text-[#1e3a8a] dark:text-orange-400">
                  Education
                </span>
                <span class="text-xs font-mono text-[#64748b] dark:text-zinc-400">{{ education.period }}</span>
              </div>

              <h3 class="text-xl font-bold text-[#0f172a] dark:text-zinc-100">{{ education.degree }}</h3>
              <p class="text-sm font-semibold text-[#1e3a8a] dark:text-orange-400 mt-1">{{ education.institution }}</p>
              <p class="text-xs font-mono text-[#64748b] dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                <i class="fa-solid fa-location-dot text-[#94a3b8] dark:text-zinc-500"></i>
                <span>{{ education.location }}</span>
              </p>

              <div class="mt-6 p-4 rounded-xl bg-[#faf8f5] dark:bg-zinc-950/70 border border-[#e8e4dc] dark:border-zinc-800 flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-wider text-[#64748b] dark:text-zinc-400 font-medium">Academic CGPA</span>
                <span class="text-xl font-bold font-mono text-[#1e3a8a] dark:text-orange-400">{{ education.cgpa }}</span>
              </div>
            </div>

            <div class="mt-6 pt-5 border-t border-[#e8e4dc] dark:border-zinc-800 space-y-4">
              <div>
                <p class="text-xs font-mono text-[#64748b] dark:text-zinc-400 mb-2.5 font-medium">Core Coursework</p>
                <div class="flex flex-wrap gap-1.5">
                  @for (course of education.coursework; track course) {
                    <span class="px-2.5 py-1 rounded-md bg-[#f4f0ea] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 text-xs font-mono text-[#334155] dark:text-zinc-300">
                      {{ course }}
                    </span>
                  }
                </div>
              </div>
              @if (education.languages?.length) {
                <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-[#e8e4dc] dark:border-zinc-800/80">
                  <span class="text-xs font-mono text-[#64748b] dark:text-zinc-400">Languages:</span>
                  @for (lang of education.languages; track lang) {
                    <span class="text-xs font-mono text-[#334155] dark:text-zinc-300 font-semibold">{{ lang }}</span>
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
