import { Component, HostListener, OnDestroy, computed, signal } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';
import { ProjectCategory, ProjectItem } from '../../models/portfolio.model';

type FilterOption = 'All' | ProjectCategory;

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <section id="projects" class="py-12 sm:py-16 border-b border-zinc-900">
      <div class="max-w-6xl mx-auto px-5 sm:px-8">
        <!-- Section Header + Filter Tabs -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
          <div class="max-w-2xl">
            <p class="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              02 / Selected Work
            </p>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
              Engineering Projects &amp; Case Studies
            </h2>
            <p class="text-zinc-400 mt-3 text-base leading-relaxed">
              Multi-tenant SaaS platforms, .NET 8 workflow APIs, document digitization pipelines, and static-page Angular web experiences.
            </p>
          </div>

          <!-- Category Filter Bar -->
          <div class="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects by category">
            @for (cat of categories(); track cat) {
              <button
                type="button"
                role="tab"
                [attr.aria-selected]="activeCategory() === cat"
                (click)="setCategory(cat)"
                [class]="
                  activeCategory() === cat
                    ? 'px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border bg-zinc-100 text-zinc-950 border-zinc-100 font-semibold'
                    : 'px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-100 hover:border-zinc-700'
                "
              >
                {{ cat }}
              </button>
            }
          </div>
        </div>

        <!-- Projects Grid (scales cleanly as more projects are added) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          @for (project of filteredProjects(); track project.id) {
            <article
              class="group rounded-2xl bg-zinc-900/55 border border-zinc-800/90 p-6 sm:p-7 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300"
              [class.lg:col-span-2]="project.featured && filteredProjects().length % 2 === 1 && $first"
            >
              <div>
                <!-- Card Header Badges -->
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-emerald-400">
                      {{ project.category }}
                    </span>
                    @if (project.featured) {
                      <span class="px-2.5 py-1 rounded-md bg-zinc-800/70 text-xs font-mono text-zinc-300">
                        Featured
                      </span>
                    }
                    @if (project.liveUrl) {
                      <a
                        [href]="project.liveUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 transition-all"
                      >
                        <span class="relative flex h-2 w-2">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        <span>LIVE</span>
                        <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                      </a>
                    }
                  </div>
                  <span class="text-xs font-mono text-zinc-500">{{ project.role }}</span>
                </div>

                <!-- Title & Summary -->
                <h3 class="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                  {{ project.title }}
                </h3>
                <p class="text-sm text-zinc-300 mt-2 leading-relaxed">
                  {{ project.tagline }}
                </p>

                <!-- Optional Workflow Pipeline Strip -->
                @if (project.workflowSteps?.length) {
                  <div class="mt-5 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                    <p class="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                      Workflow Pipeline
                    </p>
                    <div class="flex flex-wrap items-center gap-1.5 text-xs font-mono text-zinc-300">
                      @for (step of project.workflowSteps; track step; let last = $last) {
                        <span class="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">{{ step }}</span>
                        @if (!last) {
                          <i class="fa-solid fa-arrow-right text-[10px] text-emerald-400 mx-0.5"></i>
                        }
                      }
                    </div>
                  </div>
                }

                <!-- Top Highlights Preview -->
                <ul class="mt-5 space-y-2.5 text-sm text-zinc-400">
                  @for (bullet of project.highlights.slice(0, 3); track bullet) {
                    <li class="flex items-start gap-2.5 leading-relaxed">
                      <i class="fa-solid fa-angle-right text-emerald-400 text-xs mt-1.5 shrink-0"></i>
                      <span>{{ bullet }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Footer: Tech Stack + Actions -->
              <div class="mt-6 pt-5 border-t border-zinc-800/80 space-y-4">
                <div class="flex flex-wrap gap-1.5">
                  @for (tech of project.techStack; track tech) {
                    <span class="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800/90 text-xs font-mono text-zinc-300">
                      {{ tech }}
                    </span>
                  }
                </div>

                <div class="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    (click)="openProject(project)"
                    class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>Architecture &amp; Details</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                  </button>

                  <div class="flex items-center gap-2.5">
                    @if (project.githubUrl) {
                      <a
                        [href]="project.githubUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
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
                        class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-all shadow-sm"
                      >
                        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Visit Live</span>
                        <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                      </a>
                    }
                  </div>
                </div>
              </div>
            </article>
          }
        </div>
      </div>

      <!-- Case Study Detail Modal -->
      @if (selectedProject(); as project) {
        <div
          class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="project.title"
          (click)="closeModal()"
        >
          <div
            class="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-6 sm:p-8 animate-slide-up"
            (click)="$event.stopPropagation()"
          >
            <div class="flex items-start justify-between gap-4 pb-5 border-b border-zinc-800">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                    {{ project.category }}
                  </span>
                  <span class="text-xs font-mono text-zinc-500">{{ project.role }}</span>
                </div>
                <h3 class="text-2xl font-bold text-zinc-50">{{ project.title }}</h3>
              </div>

              <button
                type="button"
                aria-label="Close project details"
                (click)="closeModal()"
                class="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center shrink-0"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="space-y-6 mt-6">
              <div>
                <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">Overview</h4>
                <p class="text-sm sm:text-base text-zinc-300 leading-relaxed">{{ project.summary }}</p>
              </div>

              <div class="rounded-xl bg-zinc-900/70 border border-zinc-800 p-4 sm:p-5">
                <h4 class="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                  Architecture &amp; Technical Decisions
                </h4>
                <p class="text-sm text-zinc-300 leading-relaxed">{{ project.architectureNotes }}</p>
              </div>

              @if (project.architectureDiagram?.length) {
                <div class="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-5">
                  <div class="flex items-center justify-between gap-2 mb-3.5">
                    <h4 class="text-xs font-mono uppercase tracking-wider text-emerald-400">
                      System Architecture Diagram
                    </h4>
                    <span class="text-[11px] font-mono text-zinc-500">Request &amp; Data Flow</span>
                  </div>

                  <div class="flex flex-col md:flex-row md:items-stretch gap-2">
                    @for (node of project.architectureDiagram; track node.layer; let last = $last) {
                      <div class="flex-1 rounded-lg bg-zinc-950 border border-zinc-800/90 p-3 flex flex-col justify-between">
                        <div>
                          <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                            {{ node.layer }}
                          </span>
                          <h5 class="text-xs sm:text-sm font-semibold text-zinc-100 mt-1">
                            {{ node.component }}
                          </h5>
                        </div>
                        <p class="text-[11px] text-zinc-400 leading-relaxed mt-2">
                          {{ node.details }}
                        </p>
                      </div>

                      @if (!last) {
                        <div class="flex md:flex-col items-center justify-center gap-1 py-1 md:py-0 md:px-0.5 shrink-0">
                          <i class="fa-solid fa-arrow-down md:hidden text-emerald-400 text-xs"></i>
                          <i class="fa-solid fa-arrow-right hidden md:inline text-emerald-400 text-xs"></i>
                          @if (node.linkLabel) {
                            <span class="text-[10px] font-mono text-zinc-500 whitespace-nowrap md:max-w-[74px] md:text-center md:whitespace-normal leading-tight">
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
                  <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2.5">
                    End-to-End Flow
                  </h4>
                  <div class="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-200">
                    @for (step of project.workflowSteps; track step; let last = $last) {
                      <span class="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">{{ step }}</span>
                      @if (!last) {
                        <i class="fa-solid fa-arrow-right text-emerald-400 text-[10px]"></i>
                      }
                    }
                  </div>
                </div>
              }

              <div>
                <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                  Key Engineering Deliverables
                </h4>
                <ul class="space-y-2.5 text-sm text-zinc-300">
                  @for (item of project.highlights; track item) {
                    <li class="flex items-start gap-2.5 leading-relaxed">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                      <span>{{ item }}</span>
                    </li>
                  }
                </ul>
              </div>

              <div class="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div class="flex flex-wrap gap-1.5">
                  @for (tech of project.techStack; track tech) {
                    <span class="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
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
                      class="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 hover:bg-zinc-800"
                    >
                      <i class="fa-brands fa-github mr-1.5"></i>View Repository
                    </a>
                  }
                  @if (project.liveUrl) {
                    <a
                      [href]="project.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-colors"
                    >
                      <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
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

  readonly categories = computed<FilterOption[]>(() => {
    const distinct = Array.from(new Set(this.projects().map((p) => p.category)));
    return ['All', ...distinct];
  });

  readonly filteredProjects = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'All') {
      return this.projects();
    }
    return this.projects().filter((p) => p.category === cat);
  });

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
