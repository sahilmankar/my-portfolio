import { Component } from '@angular/core';
import { EXPERIENCES } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experience" class="py-12 sm:py-16 border-b border-zinc-900">
      <div class="max-w-6xl mx-auto px-5 sm:px-8">
        <!-- Section Header -->
        <div class="max-w-2xl mb-8">
          <p class="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            01 / Experience
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
            Production Engineering Impact
          </h2>
          <p class="text-zinc-400 mt-3 text-base leading-relaxed">
            Delivering enterprise workforce, payroll, and hardware-integrated synchronization systems in production.
          </p>
        </div>

        <!-- Experience Cards -->
        <div class="space-y-8">
          @for (exp of experiences; track exp.company + exp.period) {
            <article class="rounded-2xl bg-zinc-900/50 border border-zinc-800/90 p-6 sm:p-8">
              <!-- Top Meta Row -->
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-6 border-b border-zinc-800/80">
                <div>
                  <div class="flex flex-wrap items-center gap-3">
                    <h3 class="text-xl sm:text-2xl font-bold text-zinc-100">
                      {{ exp.role }}
                    </h3>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {{ exp.period }}
                    </span>
                  </div>
                  <p class="text-base font-medium text-zinc-300 mt-1">
                    {{ exp.company }}
                  </p>
                  <p class="text-xs font-mono text-zinc-500 mt-1">
                    {{ exp.employmentType }}
                  </p>
                </div>

                <div class="flex items-center gap-2 text-sm text-zinc-400 font-mono shrink-0">
                  <i class="fa-solid fa-location-dot text-zinc-500"></i>
                  <span>{{ exp.location }}</span>
                </div>
              </div>

              <p class="text-zinc-300 text-sm sm:text-base leading-relaxed mt-6">
                {{ exp.summary }}
              </p>

              <!-- Grouped Impact Columns -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7">
                @for (group of exp.impactGroups; track group.area) {
                  <div class="rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-5 flex flex-col">
                    <h4 class="text-sm font-semibold text-zinc-100 pb-3 mb-3 border-b border-zinc-800/80">
                      {{ group.area }}
                    </h4>
                    <ul class="space-y-3 text-sm text-zinc-400 leading-relaxed">
                      @for (point of group.points; track point) {
                        <li class="flex items-start gap-2.5">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                          <span>{{ point }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>

              <!-- Technologies Used -->
              <div class="mt-7 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
                <span class="text-xs font-mono text-zinc-500 mr-2">Core Stack:</span>
                @for (tech of exp.technologies; track tech) {
                  <span class="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                    {{ tech }}
                  </span>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  readonly experiences = EXPERIENCES;
}
