import { Component } from '@angular/core';
import { EXPERIENCES } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experience" class="py-12 sm:py-16 border-b border-[#e8e4dc] dark:border-zinc-850 transition-colors duration-200">
      <div class="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        <!-- Section Header -->
        <div class="max-w-3xl mb-8">
          <p class="text-xs font-mono uppercase tracking-widest text-[#1e3a8a] dark:text-orange-400 font-semibold mb-2">
            01 / Experience &amp; Scale
          </p>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] dark:text-zinc-50">
            Enterprise Production Track Record
          </h2>
          <p class="text-[#475569] dark:text-zinc-400 mt-2 text-base leading-relaxed">
            2.8+ years engineering enterprise Contract Labour Management Systems (CLMS), high-throughput hardware sync pipelines, and database optimizations.
          </p>
        </div>

        <!-- Experience Cards -->
        <div class="space-y-6">
          @for (exp of experiences; track exp.company + exp.period) {
            <article class="rounded-2xl bg-white dark:bg-zinc-900/60 border border-[#e8e4dc] dark:border-zinc-800 p-6 sm:p-8 shadow-sm dark:shadow-md dark:shadow-black/20 transition-colors">
              <!-- Top Meta Row -->
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-5 border-b border-[#e8e4dc] dark:border-zinc-800">
                <div>
                  <div class="flex flex-wrap items-center gap-3">
                    <h3 class="text-xl sm:text-2xl font-bold text-[#0f172a] dark:text-zinc-100">
                      {{ exp.role }}
                    </h3>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#eef2ff] dark:bg-orange-500/10 text-[#1e3a8a] dark:text-orange-300 border border-[#c7d2fe] dark:border-orange-500/30">
                      {{ exp.period }}
                    </span>
                  </div>
                  <p class="text-base font-bold text-[#1e3a8a] dark:text-orange-400 mt-1">
                    {{ exp.company }}
                  </p>
                  <p class="text-xs font-mono text-[#64748b] dark:text-zinc-400 mt-1">
                    {{ exp.employmentType }}
                  </p>
                </div>

                <div class="flex items-center gap-2 text-sm text-[#64748b] dark:text-zinc-400 font-mono shrink-0">
                  <i class="fa-solid fa-location-dot text-[#94a3b8] dark:text-zinc-500"></i>
                  <span>{{ exp.location }}</span>
                </div>
              </div>

              <!-- High-Impact Production Metric Highlights -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
                <div class="p-3.5 sm:p-4 rounded-xl bg-[#faf8f5] dark:bg-zinc-950/70 border border-[#e8e4dc] dark:border-zinc-800">
                  <div class="text-xl sm:text-2xl font-extrabold font-mono text-[#1e3a8a] dark:text-orange-400">10m &rarr; &lt;2m</div>
                  <div class="text-xs font-bold text-[#0f172a] dark:text-zinc-200 mt-1">SQL Optimization</div>
                  <div class="text-[11px] text-[#64748b] dark:text-zinc-400 mt-0.5">5x speedup via set-based query redesign</div>
                </div>

                <div class="p-3.5 sm:p-4 rounded-xl bg-[#faf8f5] dark:bg-zinc-950/70 border border-[#e8e4dc] dark:border-zinc-800">
                  <div class="text-xl sm:text-2xl font-extrabold font-mono text-[#1e3a8a] dark:text-orange-400">60,000+</div>
                  <div class="text-xs font-bold text-[#0f172a] dark:text-zinc-200 mt-1">Daily Punch Sync</div>
                  <div class="text-[11px] text-[#64748b] dark:text-zinc-400 mt-0.5">70+ biometric readers with zero lockup</div>
                </div>

                <div class="p-3.5 sm:p-4 rounded-xl bg-[#faf8f5] dark:bg-zinc-950/70 border border-[#e8e4dc] dark:border-zinc-800">
                  <div class="text-xl sm:text-2xl font-extrabold font-mono text-[#1e3a8a] dark:text-orange-400">100+ Fixes</div>
                  <div class="text-xs font-bold text-[#0f172a] dark:text-zinc-200 mt-1">SonarQube Remediated</div>
                  <div class="text-[11px] text-[#64748b] dark:text-zinc-400 mt-0.5">Resolved bugs, leaks &amp; duplicated logic</div>
                </div>

                <div class="p-3.5 sm:p-4 rounded-xl bg-[#faf8f5] dark:bg-zinc-950/70 border border-[#e8e4dc] dark:border-zinc-800">
                  <div class="text-xl sm:text-2xl font-extrabold font-mono text-[#1e3a8a] dark:text-orange-400">~10 hrs/mo</div>
                  <div class="text-xs font-bold text-[#0f172a] dark:text-zinc-200 mt-1">HR Labor Saved</div>
                  <div class="text-[11px] text-[#64748b] dark:text-zinc-400 mt-0.5">Automated overtime &amp; attendance rules</div>
                </div>
              </div>

              <p class="text-[#475569] dark:text-zinc-300 text-sm sm:text-base leading-relaxed mt-6 font-normal">
                {{ exp.summary }}
              </p>

              <!-- Grouped Impact Columns with Domain Icons -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                @for (group of exp.impactGroups; track group.area) {
                  <div class="rounded-xl bg-[#faf8f5] dark:bg-zinc-950/70 border border-[#e8e4dc] dark:border-zinc-800 p-5 flex flex-col justify-between">
                    <div>
                      <div class="flex items-center gap-2 pb-2.5 mb-3 border-b border-[#e8e4dc] dark:border-zinc-800">
                        <i
                          class="text-xs text-[#1e3a8a] dark:text-orange-400"
                          [class.fa-users-gear]="group.area.includes('CLMS')"
                          [class.fa-fingerprint]="group.area.includes('Biometric')"
                          [class.fa-database]="group.area.includes('SQL')"
                        ></i>
                        <h4 class="text-sm font-bold text-[#0f172a] dark:text-zinc-200">
                          {{ group.area }}
                        </h4>
                      </div>
                      <ul class="space-y-2.5 text-sm text-[#334155] dark:text-zinc-400 leading-relaxed">
                        @for (point of group.points; track point) {
                          <li class="flex items-start gap-2.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] dark:bg-orange-400 mt-2 shrink-0"></span>
                            <span>{{ point }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                }
              </div>

              <!-- Technologies Used -->
              <div class="mt-6 pt-5 border-t border-[#e8e4dc] dark:border-zinc-800 flex flex-wrap items-center gap-2">
                <span class="text-xs font-mono text-[#64748b] dark:text-zinc-400 mr-2 font-medium">Core Stack:</span>
                @for (tech of exp.technologies; track tech) {
                  <span class="px-2.5 py-1 rounded-md bg-[#f4f0ea] dark:bg-zinc-800/80 border border-[#e8e4dc] dark:border-zinc-700 text-xs font-mono text-[#334155] dark:text-zinc-300">
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
