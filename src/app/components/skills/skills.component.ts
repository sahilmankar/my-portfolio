import { Component } from '@angular/core';
import { SKILL_CATEGORIES } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <section id="skills" class="py-12 sm:py-16 border-b border-zinc-900">
      <div class="max-w-6xl mx-auto px-5 sm:px-8">
        <div class="max-w-2xl mb-8">
          <p class="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            03 / Technical Stack
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
            Architecture, Stack &amp; Tooling
          </h2>
          <p class="text-zinc-400 mt-3 text-base leading-relaxed">
            Technologies and engineering patterns used across enterprise backend systems, multi-tenant SaaS, and frontend applications.
          </p>
        </div>

        <!-- Bento Skills Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          @for (category of categories; track category.title) {
            <div class="rounded-2xl bg-zinc-900/50 border border-zinc-800/90 p-5 hover:border-zinc-700/90 transition-colors flex flex-col">
              <div class="flex items-center gap-3 mb-2">
                <span class="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-400 text-xs">
                  <i [class]="category.icon"></i>
                </span>
                <h3 class="text-sm font-semibold text-zinc-100">{{ category.title }}</h3>
              </div>
              <p class="text-xs text-zinc-500 mb-4 leading-relaxed">{{ category.subtitle }}</p>

              <div class="flex flex-wrap gap-1.5 mt-auto">
                @for (item of category.items; track item) {
                  <span class="px-2.5 py-1 rounded-md bg-zinc-950/90 border border-zinc-800/90 text-xs font-mono text-zinc-300">
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
