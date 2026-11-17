import { Component, HostListener, OnDestroy, computed, signal } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';
import { ProjectCategory, ProjectItem } from '../../models/portfolio.model';

type FilterOption = 'All' | ProjectCategory;
type FlagshipView = 'flow' | 'decisions' | 'pipeline';

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <section id="projects" class="py-12 sm:py-16 border-b border-[#e8e4dc] dark:border-zinc-850 transition-colors duration-200">
      <div class="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 space-y-14">
        <!-- Section Main Header -->
        <div class="max-w-3xl">
          <p class="text-xs font-mono uppercase tracking-widest text-[#1e3a8a] dark:text-orange-400 font-semibold mb-2">
            02 / Systems &amp; Products
          </p>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] dark:text-zinc-50">
            Featured Systems &amp; Technical Case Studies
          </h2>
          <p class="text-[#475569] dark:text-zinc-400 mt-2 text-base leading-relaxed">
            Multi-tenant offline-first SaaS platforms, privacy-first computer vision microservices, and state-guarded enterprise workflow engines.
          </p>
        </div>

        <!-- ========================================== -->
        <!-- TIER 1: FLAGSHIP PRODUCTION SPOTLIGHT      -->
        <!-- ========================================== -->
        <div class="space-y-6">
          <div class="flex items-center gap-2 pb-2 border-b border-[#e8e4dc] dark:border-zinc-800">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e3a8a] text-white dark:bg-orange-500 dark:text-zinc-950 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              <i class="fa-solid fa-star text-[10px]"></i>
              <span>Tier 1 · Flagship Systems (Self-Contained Case Studies)</span>
            </span>
           
          </div>

          <div class="space-y-8">
            @for (project of flagshipProjects(); track project.id) {
              <article class="rounded-3xl bg-white dark:bg-zinc-900/80 border border-[#e8e4dc] dark:border-zinc-800 p-6 sm:p-9 shadow-lg shadow-[#0f172a]/5 dark:shadow-black/30 hover:border-[#c7d2fe] dark:hover:border-orange-500/40 transition-all duration-300">
                <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                  <!-- Left Column: Story, Highlights & Direct Actions (7 cols) -->
                  <div class="xl:col-span-7 space-y-4">
                    <div class="flex flex-wrap items-center gap-2.5">
                      @if (project.liveUrl) {
                        <a
                          [href]="project.liveUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 transition-all"
                        >
                          <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span>LIVE DEMO</span>
                          <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                        </a>
                      }
                      <span class="px-2.5 py-1 rounded-md bg-[#eef2ff] dark:bg-zinc-800 border border-[#c7d2fe] dark:border-zinc-700 text-xs font-mono font-semibold text-[#1e3a8a] dark:text-orange-400">
                        {{ project.category }}
                      </span>
                      <span class="text-xs font-mono text-[#64748b] dark:text-zinc-400">
                        {{ project.role }}
                      </span>
                    </div>

                    <div>
                      <h3 class="text-2xl sm:text-3xl font-extrabold text-[#0f172a] dark:text-zinc-50 leading-tight">
                        {{ project.title }}
                      </h3>
                      <p class="text-sm sm:text-base text-[#475569] dark:text-zinc-300 mt-2 leading-relaxed">
                        {{ project.summary }}
                      </p>
                    </div>

                    <!-- Bullet Highlights -->
                    <div class="pt-1">
                      <p class="text-xs font-mono uppercase tracking-wider text-[#64748b] dark:text-zinc-400 font-semibold mb-2">
                        Key Engineering Deliverables
                      </p>
                      <ul class="space-y-2 text-sm text-[#334155] dark:text-zinc-300">
                        @for (bullet of project.highlights.slice(0, 4); track bullet) {
                          <li class="flex items-start gap-2.5 leading-relaxed">
                            <i class="fa-solid fa-circle-check text-[#1e3a8a] dark:text-orange-400 text-xs mt-1 shrink-0"></i>
                            <span>{{ bullet }}</span>
                          </li>
                        }
                      </ul>
                    </div>

                    <!-- Tech Stack Pills -->
                    <div class="flex flex-wrap gap-1.5 pt-2">
                      @for (tech of project.techStack; track tech) {
                        <span class="px-2.5 py-1 rounded-md bg-[#f4f0ea] dark:bg-zinc-950 border border-[#e8e4dc] dark:border-zinc-800 text-xs font-mono text-[#334155] dark:text-zinc-300">
                          {{ tech }}
                        </span>
                      }
                    </div>

                    <!-- Actions (Zero Duplication - Direct Value) -->
                    <div class="flex flex-wrap items-center gap-3 pt-3">
                      @if (project.liveUrl) {
                        <a
                          [href]="project.liveUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e3a8a] hover:bg-[#172554] dark:bg-orange-500 dark:hover:bg-orange-400 text-white dark:text-zinc-950 text-xs font-bold transition-all shadow-sm"
                        >
                          <span class="w-2 h-2 rounded-full bg-white dark:bg-zinc-950"></span>
                          <span>Visit Live System</span>
                          <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                        </a>
                      }
                      @if (project.githubUrl) {
                        <a
                          [href]="project.githubUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-[#e8e4dc] dark:border-zinc-700 text-[#334155] dark:text-zinc-200 hover:text-[#0f172a] dark:hover:text-white text-xs font-mono shadow-2xs hover:border-[#cbd5e1] dark:hover:border-zinc-600 transition-colors"
                        >
                          <i class="fa-brands fa-github text-sm"></i>
                          <span>View Source Code</span>
                        </a>
                      }
                    </div>
                  </div>

                  <!-- Right Column: Interactive Embedded Architecture Console (5 cols) -->
                  <div class="xl:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#faf8f5] dark:bg-zinc-950/70 border border-[#e8e4dc] dark:border-zinc-800 space-y-3.5">
                    <!-- Interactive View Switcher Tabs -->
                    <div class="flex items-center justify-between pb-3 border-b border-[#e8e4dc] dark:border-zinc-800 gap-2 flex-wrap">
                      <span class="text-xs font-mono uppercase tracking-wider text-[#1e3a8a] dark:text-orange-400 font-bold">
                        Architecture Console
                      </span>

                      <div class="inline-flex rounded-lg bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800 p-0.5 text-[11px] font-mono shadow-2xs">
                        <button
                          type="button"
                          (click)="setFlagshipView(project.id, 'flow')"
                          class="px-2.5 py-1 rounded-md transition-colors"
                          [class.bg-[#1e3a8a]]="getFlagshipView(project.id) === 'flow'"
                          [class.text-white]="getFlagshipView(project.id) === 'flow'"
                          [class.text-[#64748b]]="getFlagshipView(project.id) !== 'flow'"
                          [class.dark:text-zinc-400]="getFlagshipView(project.id) !== 'flow'"
                        >
                          Flow
                        </button>
                        <button
                          type="button"
                          (click)="setFlagshipView(project.id, 'decisions')"
                          class="px-2.5 py-1 rounded-md transition-colors"
                          [class.bg-[#1e3a8a]]="getFlagshipView(project.id) === 'decisions'"
                          [class.text-white]="getFlagshipView(project.id) === 'decisions'"
                          [class.text-[#64748b]]="getFlagshipView(project.id) !== 'decisions'"
                          [class.dark:text-zinc-400]="getFlagshipView(project.id) !== 'decisions'"
                        >
                          Decisions
                        </button>
                        @if (project.workflowSteps?.length) {
                          <button
                            type="button"
                            (click)="setFlagshipView(project.id, 'pipeline')"
                            class="px-2.5 py-1 rounded-md transition-colors"
                            [class.bg-[#1e3a8a]]="getFlagshipView(project.id) === 'pipeline'"
                            [class.text-white]="getFlagshipView(project.id) === 'pipeline'"
                            [class.text-[#64748b]]="getFlagshipView(project.id) !== 'pipeline'"
                            [class.dark:text-zinc-400]="getFlagshipView(project.id) !== 'pipeline'"
                          >
                            Pipeline
                          </button>
                        }
                      </div>
                    </div>

                    <!-- View 1: Architecture Diagram Flow -->
                    @if (getFlagshipView(project.id) === 'flow') {
                      <div class="space-y-2 animate-fade-in">
                        @for (node of project.architectureDiagram; track node.layer; let last = $last) {
                          <div class="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800/80 shadow-2xs">
                            <div class="flex items-center justify-between">
                              <span class="text-[10px] font-mono font-bold text-[#1e3a8a] dark:text-orange-400 uppercase tracking-wider">
                                {{ node.layer }}
                              </span>
                              <span class="text-xs font-bold text-[#0f172a] dark:text-zinc-100">
                                {{ node.component }}
                              </span>
                            </div>
                            <p class="text-[11px] text-[#64748b] dark:text-zinc-400 mt-1 leading-relaxed">
                              {{ node.details }}
                            </p>
                          </div>
                          @if (!last) {
                            <div class="flex items-center justify-center -my-1 text-[#1e3a8a] dark:text-orange-400 text-xs">
                              <i class="fa-solid fa-arrow-down text-[10px]"></i>
                            </div>
                          }
                        }
                      </div>
                    }

                    <!-- View 2: Technical Decisions & Resiliency -->
                    @if (getFlagshipView(project.id) === 'decisions') {
                      <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800 space-y-3 animate-fade-in">
                        <div class="flex items-center gap-2 text-xs font-mono font-bold text-[#1e3a8a] dark:text-orange-400">
                          <i class="fa-solid fa-shield-halved"></i>
                          <span>Engineering Rationale &amp; Guarantees</span>
                        </div>
                        <p class="text-xs text-[#334155] dark:text-zinc-300 leading-relaxed font-normal">
                          {{ project.architectureNotes }}
                        </p>
                        <div class="pt-2 border-t border-[#e8e4dc] dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-[#64748b] dark:text-zinc-400">
                          <span>Production Tier</span>
                          <span class="text-emerald-600 dark:text-emerald-400 font-semibold">Zero Data Loss · Low Latency</span>
                        </div>
                      </div>
                    }

                    <!-- View 3: Execution Pipeline Flow -->
                    @if (getFlagshipView(project.id) === 'pipeline' && project.workflowSteps?.length) {
                      <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800 space-y-2.5 animate-fade-in">
                        <p class="text-[11px] font-mono uppercase tracking-wider text-[#64748b] dark:text-zinc-400 font-semibold">
                          Request / Data Lifecycle
                        </p>
                        <div class="space-y-1.5">
                          @for (step of project.workflowSteps; track step; let idx = $index) {
                            <div class="flex items-center gap-2 p-2 rounded-lg bg-[#faf8f5] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 text-xs font-mono text-[#334155] dark:text-zinc-300">
                              <span class="w-5 h-5 rounded-full bg-[#1e3a8a]/10 dark:bg-orange-500/10 text-[#1e3a8a] dark:text-orange-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                                0{{ idx + 1 }}
                              </span>
                              <span>{{ step }}</span>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </article>
            }
          </div>
        </div>

        <!-- ========================================== -->
        <!-- TIER 2: SPECIALIZED SYSTEMS & PRODUCTS     -->
        <!-- ========================================== -->
        <div class="space-y-6 pt-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e8e4dc] dark:border-zinc-800">
            <div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-[#0f172a] dark:text-zinc-200 border border-[#e8e4dc] dark:border-zinc-700 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
                <span>Tier 2 · Specialized Systems &amp; Web Products</span>
              </span>
            </div>

            <!-- Filter Tabs for Tier 2 -->
            <div class="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter specialized projects">
              @for (cat of specializedCategories(); track cat) {
                <button
                  type="button"
                  role="tab"
                  [attr.aria-selected]="activeCategory() === cat"
                  (click)="setCategory(cat)"
                  [class]="
                    activeCategory() === cat
                      ? 'px-3 py-1 rounded-lg text-xs font-mono transition-all border bg-[#1e3a8a] text-white border-[#1e3a8a] dark:bg-orange-500 dark:text-zinc-950 dark:border-orange-400 font-bold shadow-xs'
                      : 'px-3 py-1 rounded-lg text-xs font-mono transition-all border bg-white dark:bg-zinc-900 text-[#475569] dark:text-zinc-400 border-[#e8e4dc] dark:border-zinc-800 hover:text-[#0f172a] dark:hover:text-white hover:border-[#cbd5e1] dark:hover:border-zinc-700 shadow-xs'
                  "
                >
                  {{ cat }}
                </button>
              }
            </div>
          </div>

          <!-- Tier 2 Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (project of specializedProjects(); track project.id) {
              <article
                class="group rounded-2xl bg-white dark:bg-zinc-900/70 border border-[#e8e4dc] dark:border-zinc-800 p-6 sm:p-7 flex flex-col justify-between hover:border-[#c7d2fe] dark:hover:border-orange-500/40 transition-all duration-300 shadow-sm dark:shadow-md dark:shadow-black/20"
              >
                <div>
                  <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span class="px-2.5 py-1 rounded-md bg-[#f4f0ea] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 text-xs font-mono font-semibold text-[#1e3a8a] dark:text-orange-400">
                      {{ project.category }}
                    </span>
                    <span class="text-xs font-mono text-[#64748b] dark:text-zinc-400">{{ project.role }}</span>
                  </div>

                  <h3 class="text-xl font-bold text-[#0f172a] dark:text-slate-100 group-hover:text-[#1e3a8a] dark:group-hover:text-white transition-colors">
                    {{ project.title }}
                  </h3>
                  <p class="text-sm text-[#475569] dark:text-zinc-300 mt-2 leading-relaxed">
                    {{ project.tagline }}
                  </p>

                  <!-- Workflow Steps if present -->
                  @if (project.workflowSteps?.length) {
                    <div class="mt-4 p-3 rounded-xl bg-[#faf8f5] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800">
                      <p class="text-[10px] font-mono uppercase tracking-wider text-[#64748b] dark:text-zinc-400 font-semibold mb-1.5">
                        Lifecycle Stages
                      </p>
                      <div class="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[#334155] dark:text-zinc-300">
                        @for (step of project.workflowSteps; track step; let last = $last) {
                          <span class="px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-700/80 text-[11px]">{{ step }}</span>
                          @if (!last) {
                            <i class="fa-solid fa-arrow-right text-[9px] text-[#1e3a8a] dark:text-orange-400"></i>
                          }
                        }
                      </div>
                    </div>
                  }

                  <!-- Bullet preview -->
                  <ul class="mt-4 space-y-2 text-sm text-[#475569] dark:text-zinc-400">
                    @for (bullet of project.highlights.slice(0, 2); track bullet) {
                      <li class="flex items-start gap-2.5 leading-relaxed">
                        <i class="fa-solid fa-angle-right text-[#1e3a8a] dark:text-orange-400 text-xs mt-1.5 shrink-0"></i>
                        <span>{{ bullet }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Footer: Tech & Actions -->
                <div class="mt-6 pt-5 border-t border-[#e8e4dc] dark:border-zinc-800 space-y-3.5">
                  <div class="flex flex-wrap gap-1.5">
                    @for (tech of project.techStack; track tech) {
                      <span class="px-2.5 py-1 rounded-md bg-[#f4f0ea] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 text-xs font-mono text-[#334155] dark:text-zinc-300">
                        {{ tech }}
                      </span>
                    }
                  </div>

                  <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      (click)="openProject(project)"
                      class="inline-flex items-center gap-2 text-xs font-bold text-[#1e3a8a] hover:text-[#172554] dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                    >
                      <span>Architecture &amp; Details</span>
                      <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </button>

                    <div class="flex items-center gap-2">
                      @if (project.githubUrl) {
                        <a
                          [href]="project.githubUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-[#e8e4dc] dark:border-zinc-700 text-xs font-mono text-[#334155] dark:text-zinc-300 hover:text-[#0f172a] dark:hover:text-white hover:border-[#cbd5e1] dark:hover:border-zinc-600 transition-colors shadow-2xs"
                        >
                          <i class="fa-brands fa-github"></i>
                          <span>Source</span>
                        </a>
                      }
                      @if (project.liveUrl) {
                        <a
                          [href]="project.liveUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] dark:bg-orange-500 dark:hover:bg-orange-400 text-white dark:text-zinc-950 text-xs font-bold transition-all shadow-xs"
                        >
                          <span class="w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-950"></span>
                          <span>Visit Live</span>
                          <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                        </a>
                      }
                    </div>
                  </div>
                </div>
              </article>
            }
          </div>
        </div>
      </div>

      <!-- Case Study Detail Modal (Tier 2 Projects Only) -->
      @if (selectedProject(); as project) {
        <div
          class="fixed inset-0 z-50 bg-[#0f172a]/70 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="project.title"
          (click)="closeModal()"
        >
          <div
            class="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800 shadow-2xl p-6 sm:p-8 animate-slide-up"
            (click)="$event.stopPropagation()"
          >
            <div class="flex items-start justify-between gap-4 pb-5 border-b border-[#e8e4dc] dark:border-zinc-800">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="px-2.5 py-0.5 rounded-md bg-[#eef2ff] dark:bg-orange-500/10 border border-[#c7d2fe] dark:border-orange-500/20 text-xs font-mono font-semibold text-[#1e3a8a] dark:text-orange-400">
                    {{ project.category }}
                  </span>
                  <span class="text-xs font-mono text-[#64748b] dark:text-zinc-400">{{ project.role }}</span>
                </div>
                <h3 class="text-2xl font-bold text-[#0f172a] dark:text-zinc-50">{{ project.title }}</h3>
              </div>

              <button
                type="button"
                aria-label="Close project details"
                (click)="closeModal()"
                class="w-9 h-9 rounded-lg bg-[#f4f0ea] dark:bg-zinc-800 border border-[#e8e4dc] dark:border-zinc-700 text-[#64748b] dark:text-zinc-400 hover:text-[#0f172a] dark:hover:text-white flex items-center justify-center shrink-0"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="space-y-6 mt-6">
              <div>
                <h4 class="text-xs font-mono uppercase tracking-wider text-[#64748b] dark:text-zinc-400 font-semibold mb-2">Overview</h4>
                <p class="text-sm sm:text-base text-[#334155] dark:text-zinc-300 leading-relaxed">{{ project.summary }}</p>
              </div>

              <div class="rounded-xl bg-[#faf8f5] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 p-4 sm:p-5">
                <h4 class="text-xs font-mono uppercase tracking-wider text-[#1e3a8a] dark:text-orange-400 font-bold mb-2">
                  Architecture &amp; Technical Decisions
                </h4>
                <p class="text-sm text-[#334155] dark:text-zinc-300 leading-relaxed">{{ project.architectureNotes }}</p>
              </div>

              @if (project.architectureDiagram?.length) {
                <div class="rounded-xl bg-[#faf8f5]/80 dark:bg-zinc-950/60 border border-[#e8e4dc] dark:border-zinc-800 p-4 sm:p-5">
                  <div class="flex items-center justify-between gap-2 mb-3.5">
                    <h4 class="text-xs font-mono uppercase tracking-wider text-[#1e3a8a] dark:text-orange-400 font-bold">
                      System Architecture Diagram
                    </h4>
                    <span class="text-[11px] font-mono text-[#64748b] dark:text-zinc-400 font-medium">Request &amp; Data Flow</span>
                  </div>

                  <div class="flex flex-col md:flex-row md:items-stretch gap-2">
                    @for (node of project.architectureDiagram; track node.layer; let last = $last) {
                      <div class="flex-1 rounded-lg bg-white dark:bg-zinc-900 border border-[#e8e4dc] dark:border-zinc-800 p-3 flex flex-col justify-between shadow-2xs">
                        <div>
                          <span class="text-[10px] font-mono uppercase tracking-wider text-[#1e3a8a] dark:text-orange-400 font-bold">
                            {{ node.layer }}
                          </span>
                          <h5 class="text-xs sm:text-sm font-bold text-[#0f172a] dark:text-zinc-100 mt-1">
                            {{ node.component }}
                          </h5>
                        </div>
                        <p class="text-[11px] text-[#475569] dark:text-zinc-400 leading-relaxed mt-2">
                          {{ node.details }}
                        </p>
                      </div>

                      @if (!last) {
                        <div class="flex md:flex-col items-center justify-center gap-1 py-1 md:py-0 md:px-0.5 shrink-0">
                          <i class="fa-solid fa-arrow-down md:hidden text-[#1e3a8a] dark:text-orange-400 text-xs"></i>
                          <i class="fa-solid fa-arrow-right hidden md:inline text-[#1e3a8a] dark:text-orange-400 text-xs"></i>
                          @if (node.linkLabel) {
                            <span class="text-[10px] font-mono text-[#64748b] dark:text-zinc-400 whitespace-nowrap md:max-w-[74px] md:text-center md:whitespace-normal leading-tight font-medium">
                              {{ node.linkLabel }}
                            </span>
                          }
                        </div>
                      }
                    }
                  </div>
                </div>
              }

              @if (project.workflowSteps?.length) {
                <div>
                  <h4 class="text-xs font-mono uppercase tracking-wider text-[#64748b] dark:text-zinc-400 font-semibold mb-2.5">
                    End-to-End Flow
                  </h4>
                  <div class="flex flex-wrap items-center gap-2 text-xs font-mono text-[#334155] dark:text-zinc-200">
                    @for (step of project.workflowSteps; track step; let last = $last) {
                      <span class="px-2.5 py-1.5 rounded-lg bg-[#f4f0ea] dark:bg-zinc-950 border border-[#e8e4dc] dark:border-zinc-800">{{ step }}</span>
                      @if (!last) {
                        <i class="fa-solid fa-arrow-right text-[#1e3a8a] dark:text-orange-400 text-[10px]"></i>
                      }
                    }
                  </div>
                </div>
              }

              <div>
                <h4 class="text-xs font-mono uppercase tracking-wider text-[#64748b] dark:text-zinc-400 font-semibold mb-3">
                  Key Engineering Deliverables
                </h4>
                <ul class="space-y-2.5 text-sm text-[#334155] dark:text-zinc-300">
                  @for (item of project.highlights; track item) {
                    <li class="flex items-start gap-2.5 leading-relaxed">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] dark:bg-orange-400 mt-2 shrink-0"></span>
                      <span>{{ item }}</span>
                    </li>
                  }
                </ul>
              </div>

              <div class="pt-4 border-t border-[#e8e4dc] dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div class="flex flex-wrap gap-1.5">
                  @for (tech of project.techStack; track tech) {
                    <span class="px-2.5 py-1 rounded-md bg-[#f4f0ea] dark:bg-zinc-950 border border-[#e8e4dc] dark:border-zinc-800 text-xs font-mono text-[#334155] dark:text-zinc-300">
                      {{ tech }}
                    </span>
                  }
                </div>

                <div class="flex items-center gap-3">
                  @if (project.githubUrl) {
                    <a
                      [href]="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-[#e8e4dc] dark:border-zinc-700 text-xs font-mono text-[#334155] dark:text-zinc-200 hover:bg-[#faf8f5] dark:hover:bg-zinc-700 shadow-2xs"
                    >
                      <i class="fa-brands fa-github mr-1.5"></i>View Repository
                    </a>
                  }
                  @if (project.liveUrl) {
                    <a
                      [href]="project.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] dark:bg-orange-500 dark:hover:bg-orange-400 text-white dark:text-zinc-950 text-xs font-bold transition-colors shadow-xs"
                    >
                      <span class="w-2 h-2 rounded-full bg-white dark:bg-zinc-950"></span>
                      <span>Visit Live Site</span>
                      <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  `,
})
export class ProjectsComponent implements OnDestroy {
  readonly projects = signal<ProjectItem[]>(PROJECTS);
  readonly activeCategory = signal<FilterOption>('All');
  readonly selectedProject = signal<ProjectItem | null>(null);

  readonly flagshipViews = signal<Record<string, FlagshipView>>({
    dairyops: 'flow',
    'aadhaar-extraction': 'flow',
  });

  readonly flagshipProjects = computed(() => {
    return this.projects().filter((p) => p.id === 'dairyops' || p.id === 'aadhaar-extraction');
  });

  readonly specializedCategories = computed<FilterOption[]>(() => {
    const specialized = this.projects().filter(
      (p) => p.id !== 'dairyops' && p.id !== 'aadhaar-extraction'
    );
    const distinct = Array.from(new Set(specialized.map((p) => p.category)));
    return ['All', ...distinct];
  });

  readonly specializedProjects = computed(() => {
    const specialized = this.projects().filter(
      (p) => p.id !== 'dairyops' && p.id !== 'aadhaar-extraction'
    );
    const cat = this.activeCategory();
    if (cat === 'All') {
      return specialized;
    }
    return specialized.filter((p) => p.category === cat);
  });

  setFlagshipView(projectId: string, view: FlagshipView): void {
    this.flagshipViews.update((current) => ({
      ...current,
      [projectId]: view,
    }));
  }

  getFlagshipView(projectId: string): FlagshipView {
    return this.flagshipViews()[projectId] || 'flow';
  }

  setCategory(category: FilterOption): void {
    this.activeCategory.set(category);
  }

  openProject(project: ProjectItem): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedProject()) {
      this.closeModal();
    }
  }
}
