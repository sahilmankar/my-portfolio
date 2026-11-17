import { Component } from '@angular/core';
import { SKILL_CATEGORIES } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <section id="skills" class="py-12 sm:py-16 border-b border-[#e8e4dc] dark:border-zinc-850 transition-colors duration-200">
      <div class="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        <div class="max-w-2xl mb-8">
          <p class="text-xs font-mono uppercase tracking-widest text-[#1e3a8a] dark:text-orange-400 font-semibold mb-2">
            03 / Technical Matrix
          </p>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] dark:text-zinc-50">
            Ecosystem, Frameworks &amp; Tooling
          </h2>
          <p class="text-[#475569] dark:text-zinc-400 mt-2 text-base leading-relaxed">
            Technologies, libraries, and patterns used across enterprise backend platforms, multi-tenant SaaS, and modern web applications.
          </p>
        </div>

        <!-- Bento Skills Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          @for (category of categories; track category.title) {
            <div class="rounded-2xl bg-white dark:bg-zinc-900/60 border border-[#e8e4dc] dark:border-zinc-800 p-5 sm:p-6 hover:border-[#c7d2fe] dark:hover:border-orange-500/40 transition-colors flex flex-col shadow-xs">
              <div class="flex items-center gap-3 mb-2">
                <span class="w-9 h-9 rounded-lg bg-[#eef2ff] dark:bg-zinc-800 border border-[#c7d2fe] dark:border-zinc-700 flex items-center justify-center text-[#1e3a8a] dark:text-orange-400 text-xs shadow-xs">
                  <i [class]="category.icon"></i>
                </span>
                <h3 class="text-sm font-bold text-[#0f172a] dark:text-zinc-100">{{ category.title }}</h3>
              </div>
              <p class="text-xs text-[#64748b] dark:text-zinc-400 mb-4 leading-relaxed">{{ category.subtitle }}</p>

              <div class="flex flex-wrap gap-1.5 mt-auto">
                @for (item of category.items; track item) {
                  <span class="px-2.5 py-1 rounded-md bg-[#f4f0ea] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 text-xs font-mono text-[#334155] dark:text-zinc-300">
                    {{ item }}
                  </span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly categories = SKILL_CATEGORIES;
}
