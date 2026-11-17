import { Component, signal } from '@angular/core';
import { HERO_METRICS, PROFILE_INFO } from '../../data/portfolio.data';

type TerminalTab = 'diagnostic' | 'capabilities' | 'telemetry';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section
      id="home"
      class="relative pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden border-b border-[#e8e4dc] dark:border-zinc-850 bg-grid-pattern transition-colors duration-200"
    >
      <!-- Dual Ambient Spotlight -->
      <div
        class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[48rem] h-[24rem] rounded-full bg-[#1e3a8a]/8 dark:bg-orange-500/10 blur-[130px] transition-colors"
      ></div>
      <div
        class="pointer-events-none absolute top-40 right-10 w-[24rem] h-[20rem] rounded-full bg-amber-500/8 dark:bg-amber-500/8 blur-[110px]"
      ></div>

      <div class="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          <!-- Left Column: Executive Summary & Value Pitch -->
          <div class="lg:col-span-7 space-y-6">
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800 text-xs font-mono text-[#334155] dark:text-zinc-300 shadow-xs"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              <span class="font-semibold text-emerald-700 dark:text-emerald-400">Available for Opportunities</span>
              <span class="text-slate-300 dark:text-zinc-700">|</span>
              <span>{{ profile.location }}</span>
            </div>

            <div class="space-y-3">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f172a] dark:text-zinc-50 leading-[1.1]">
                {{ profile.name }}
                <span class="block text-[#1e3a8a] dark:text-orange-400 font-bold mt-1 text-2xl sm:text-3xl lg:text-4xl transition-colors">
                  {{ profile.role }}
                </span>
              </h1>
              <p class="text-base sm:text-lg text-[#475569] dark:text-zinc-300 leading-relaxed max-w-2xl font-normal">
                {{ profile.summary }}
              </p>
            </div>

            <!-- Action Row -->
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                (click)="scrollTo($event, 'projects')"
                class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1e3a8a] hover:bg-[#172554] dark:bg-orange-500 dark:hover:bg-orange-400 text-white dark:text-zinc-950 text-sm font-bold transition-all shadow-md shadow-[#1e3a8a]/20 dark:shadow-orange-500/15"
              >
                <span>Explore Flagship Systems</span>
                <i class="fa-solid fa-arrow-down text-xs"></i>
              </a>

              <a
                [href]="profile.resumeUrl"
                [attr.download]="profile.resumeFileName"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-[#c7d2fe] dark:border-orange-500/40 text-[#1e3a8a] dark:text-orange-300 text-sm font-semibold hover:bg-[#eef2ff] dark:hover:bg-zinc-800 dark:hover:border-orange-400 transition-all shadow-xs"
              >
                <i class="fa-solid fa-file-arrow-down text-xs"></i>
                <span>Resume</span>
              </a>

              <button
                type="button"
                (click)="copyEmail()"
                class="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800 text-[#334155] dark:text-zinc-200 text-sm font-medium hover:bg-[#f8f6f0] dark:hover:bg-zinc-800 transition-all shadow-xs"
              >
                <i
                  class="fa-regular"
                  [class.fa-copy]="!emailCopied()"
                  [class.fa-check]="emailCopied()"
                  [class.text-emerald-600]="emailCopied()"
                  [class.dark:text-emerald-400]="emailCopied()"
                ></i>
                <span>{{ emailCopied() ? 'Email Copied!' : profile.email }}</span>
              </button>

              <div class="flex items-center gap-2 ml-auto sm:ml-1">
                <a
                  [href]="profile.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  class="w-11 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800 flex items-center justify-center text-[#475569] dark:text-zinc-400 hover:text-[#0f172a] dark:hover:text-white hover:border-[#cbd5e1] dark:hover:border-zinc-700 transition-colors shadow-xs"
                >
                  <i class="fa-brands fa-github text-base"></i>
                </a>
                <a
                  [href]="profile.linkedinUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  class="w-11 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800 flex items-center justify-center text-[#475569] dark:text-zinc-400 hover:text-[#0f172a] dark:hover:text-white hover:border-[#cbd5e1] dark:hover:border-zinc-700 transition-colors shadow-xs"
                >
                  <i class="fa-brands fa-linkedin-in text-base"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive Capabilities Terminal / Architecture Console -->
          <div class="lg:col-span-5">
            <div class="rounded-2xl bg-[#0b1329] dark:bg-[#131316] text-zinc-100 border border-[#1e2d4d] dark:border-zinc-800 p-5 sm:p-6 shadow-2xl shadow-blue-950/20 dark:shadow-black/50 font-mono text-xs overflow-hidden relative backdrop-blur-md">
              <!-- Terminal Header Bar -->
              <div class="flex items-center justify-between pb-3.5 border-b border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-xs"></span>
                  <span class="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-xs"></span>
                  <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
                  <span class="ml-2 text-zinc-400 text-[11px] font-semibold tracking-tight">sahil&#64;workstation:~/systems</span>
                </div>
                <div class="flex items-center gap-1.5 text-[10px]">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-emerald-400 font-bold uppercase tracking-wider">ONLINE</span>
                </div>
              </div>

              <!-- Terminal Navigation Tabs -->
              <div class="flex items-center gap-2 pt-3 pb-3 border-b border-zinc-800/80 text-[11px]">
                <button
                  type="button"
                  (click)="setTab('diagnostic')"
                  class="px-2.5 py-1 rounded-md transition-colors"
                  [class.bg-[#1e3a8a]]="activeTab() === 'diagnostic'"
                  [class.text-white]="activeTab() === 'diagnostic'"
                  [class.text-zinc-400]="activeTab() !== 'diagnostic'"
                  [class.hover:text-zinc-200]="activeTab() !== 'diagnostic'"
                >
                  $ diagnostics
                </button>
                <button
                  type="button"
                  (click)="setTab('capabilities')"
                  class="px-2.5 py-1 rounded-md transition-colors"
                  [class.bg-[#1e3a8a]]="activeTab() === 'capabilities'"
                  [class.text-white]="activeTab() === 'capabilities'"
                  [class.text-zinc-400]="activeTab() !== 'capabilities'"
                  [class.hover:text-zinc-200]="activeTab() !== 'capabilities'"
                >
                  $ stack-pulse
                </button>
                <button
                  type="button"
                  (click)="setTab('telemetry')"
                  class="px-2.5 py-1 rounded-md transition-colors"
                  [class.bg-[#1e3a8a]]="activeTab() === 'telemetry'"
                  [class.text-white]="activeTab() === 'telemetry'"
                  [class.text-zinc-400]="activeTab() !== 'telemetry'"
                  [class.hover:text-zinc-200]="activeTab() !== 'telemetry'"
                >
                  $ benchmarks
                </button>
              </div>

              <!-- Tab 1: Live Architecture Diagnostics (Default) -->
              @if (activeTab() === 'diagnostic') {
                <div class="pt-3.5 space-y-3 animate-fade-in">
                  <div class="text-zinc-400 text-[11px] leading-relaxed">
                    <span class="text-emerald-400 font-bold">&gt; GET /api/v1/system-profile</span>
                    <span class="block text-zinc-500 mt-0.5">// Verified production capabilities &amp; scale parameters</span>
                  </div>

                  <div class="space-y-2 text-[11.5px]">
                    <div class="flex items-start gap-2 p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                      <i class="fa-solid fa-bolt text-amber-400 mt-0.5 text-xs"></i>
                      <div>
                        <span class="text-zinc-200 font-bold">SQL Query Optimization:</span>
                        <span class="text-zinc-400 ml-1">10 min &rarr; &lt;2 min (5x speedup via set-based logic)</span>
                      </div>
                    </div>

                    <div class="flex items-start gap-2 p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                      <i class="fa-solid fa-fingerprint text-blue-400 mt-0.5 text-xs"></i>
                      <div>
                        <span class="text-zinc-200 font-bold">Biometric Data Pipeline:</span>
                        <span class="text-zinc-400 ml-1">60,000+ daily punch sync across 70+ hardware readers</span>
                      </div>
                    </div>

                    <div class="flex items-start gap-2 p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                      <i class="fa-solid fa-cloud-arrow-down text-emerald-400 mt-0.5 text-xs"></i>
                      <div>
                        <span class="text-zinc-200 font-bold">Offline-First Resiliency:</span>
                        <span class="text-zinc-400 ml-1">SQLite &amp; IndexedDB zero-data-loss synchronization</span>
                      </div>
                    </div>

                    <div class="flex items-start gap-2 p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                      <i class="fa-solid fa-microchip text-indigo-400 mt-0.5 text-xs"></i>
                      <div>
                        <span class="text-zinc-200 font-bold">Computer Vision &amp; KYC:</span>
                        <span class="text-zinc-400 ml-1">PaddleOCR + Verhoeff Dihedral Checksum engine</span>
                      </div>
                    </div>
                  </div>
                </div>
              }

              <!-- Tab 2: Core Engineering Capabilities -->
              @if (activeTab() === 'capabilities') {
                <div class="pt-3.5 space-y-3 animate-fade-in">
                  <div class="text-zinc-400 text-[11px]">
                    <span class="text-emerald-400 font-bold">&gt; check-stack --active</span>
                    <span class="block text-zinc-500 mt-0.5">// Core daily production tooling</span>
                  </div>

                  <div class="grid grid-cols-2 gap-2 text-[11px]">
                    <div class="p-2 rounded bg-zinc-900/80 border border-zinc-800">
                      <span class="text-blue-400 font-bold block mb-1">Backend</span>
                      <span class="text-zinc-300">ASP.NET Core 8</span>
                      <span class="text-zinc-500 block text-[10px]">Clean Architecture, Web API, C#</span>
                    </div>
                    <div class="p-2 rounded bg-zinc-900/80 border border-zinc-800">
                      <span class="text-rose-400 font-bold block mb-1">Frontend</span>
                      <span class="text-zinc-300">Angular 19 / 21</span>
                      <span class="text-zinc-500 block text-[10px]">Signals, Standalone, Tailwind</span>
                    </div>
                    <div class="p-2 rounded bg-zinc-900/80 border border-zinc-800">
                      <span class="text-amber-400 font-bold block mb-1">Database</span>
                      <span class="text-zinc-300">SQL Server &amp; PG</span>
                      <span class="text-zinc-500 block text-[10px]">EF Core, Stored Procs, Tuning</span>
                    </div>
                    <div class="p-2 rounded bg-zinc-900/80 border border-zinc-800">
                      <span class="text-emerald-400 font-bold block mb-1">Verification</span>
                      <span class="text-zinc-300">SonarQube &amp; QA</span>
                      <span class="text-zinc-500 block text-[10px]">100+ code smells remediated</span>
                    </div>
                  </div>
                </div>
              }

              <!-- Tab 3: Telemetry & Interactive Ping Benchmark -->
              @if (activeTab() === 'telemetry') {
                <div class="pt-3.5 space-y-3 animate-fade-in">
                  <div class="text-zinc-400 text-[11px]">
                    <span class="text-emerald-400 font-bold">&gt; run-telemetry --simulate</span>
                    <span class="block text-zinc-500 mt-0.5">// Architecture latency &amp; throughput simulation</span>
                  </div>

                  <div class="grid grid-cols-3 gap-2 text-center">
                    <div class="p-2 rounded bg-zinc-900/90 border border-zinc-800">
                      <div class="text-emerald-400 font-bold text-sm">{{ pingLatency() }}</div>
                      <div class="text-[10px] text-zinc-400 mt-0.5">API Latency</div>
                    </div>
                    <div class="p-2 rounded bg-zinc-900/90 border border-zinc-800">
                      <div class="text-blue-400 font-bold text-sm">-30%</div>
                      <div class="text-[10px] text-zinc-400 mt-0.5">Payload Size</div>
                    </div>
                    <div class="p-2 rounded bg-zinc-900/90 border border-zinc-800">
                      <div class="text-amber-400 font-bold text-sm">99.98%</div>
                      <div class="text-[10px] text-zinc-400 mt-0.5">Sync Reliability</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    (click)="simulatePing()"
                    [disabled]="isSimulatingPing()"
                    class="w-full mt-2 py-2 rounded-lg bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white text-[11px] font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    @if (isSimulatingPing()) {
                      <i class="fa-solid fa-spinner fa-spin text-xs"></i>
                      <span>Probing Endpoints...</span>
                    } @else {
                      <i class="fa-solid fa-gauge-high text-xs"></i>
                      <span>Simulate Benchmark Ping</span>
                    }
                  </button>
                </div>
              }

              <!-- Terminal Footer / Verified Dev Badge -->
              <div class="mt-4 pt-3.5 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                <div class="flex items-center gap-2">
                  <img
                    [src]="profile.avatarUrl"
                    [alt]="profile.name"
                    class="w-6 h-6 rounded-full object-cover border border-zinc-700"
                  />
                  <span class="text-zinc-200 font-semibold">{{ profile.name }}</span>
                </div>
                <span class="text-zinc-400 font-mono text-[10px]">2.8+ Yrs Production Experience</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Impact Metrics Strip -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
          @for (metric of metrics; track metric.label) {
            <div class="rounded-xl bg-white dark:bg-zinc-900/70 border border-[#e8e4dc] dark:border-zinc-800 p-5 sm:p-6 hover:border-[#c7d2fe] dark:hover:border-orange-500/40 transition-colors shadow-xs">
              <div class="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-[#1e3a8a] dark:text-orange-400">
                {{ metric.value }}
              </div>
              <div class="text-sm font-bold text-[#0f172a] dark:text-zinc-200 mt-1">{{ metric.label }}</div>
              <div class="text-xs text-[#64748b] dark:text-zinc-400 mt-0.5">{{ metric.sublabel }}</div>
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
  readonly activeTab = signal<TerminalTab>('diagnostic');
  readonly isSimulatingPing = signal(false);
  readonly pingLatency = signal('22ms');

  setTab(tab: TerminalTab): void {
    this.activeTab.set(tab);
  }

  simulatePing(): void {
    this.isSimulatingPing.set(true);
    setTimeout(() => {
      const sampleLatencies = ['16ms', '19ms', '21ms', '24ms', '18ms'];
      const pick = sampleLatencies[Math.floor(Math.random() * sampleLatencies.length)];
      this.pingLatency.set(pick);
      this.isSimulatingPing.set(false);
    }, 450);
  }

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
