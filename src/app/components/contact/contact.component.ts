import { Component, signal } from '@angular/core';
import { PROFILE_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section id="contact" class="py-12 sm:py-16">
      <div class="max-w-6xl mx-auto px-5 sm:px-8">
        <div class="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-7 sm:p-10 relative overflow-hidden">
          <div
            class="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px]"
          ></div>

          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-7 space-y-4">
              <p class="text-xs font-mono uppercase tracking-widest text-emerald-400">
                05 / Contact
              </p>
              <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
                Let's build something reliable together.
              </h2>
              <p class="text-zinc-400 text-base leading-relaxed max-w-xl">
                Open to backend, full-stack (.NET &amp; Angular), and system architecture discussions, product engineering roles, or technical collaborations.
              </p>

              <div class="flex flex-wrap items-center gap-3 pt-2">
                <a
                  [href]="'mailto:' + profile.email"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 text-zinc-950 text-sm font-semibold hover:bg-white transition-colors"
                >
                  <i class="fa-regular fa-envelope"></i>
                  <span>Send an Email</span>
                </a>

                <a
                  [href]="profile.resumeUrl"
                  [attr.download]="profile.resumeFileName"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-sm font-semibold hover:bg-emerald-500/25 hover:border-emerald-400/60 transition-colors"
                >
                  <i class="fa-solid fa-file-arrow-down text-xs"></i>
                  <span>Download CV</span>
                </a>

                <button
                  type="button"
                  (click)="copyEmail()"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm font-medium hover:border-zinc-700 transition-colors"
                >
                  <i
                    class="fa-regular"
                    [class.fa-copy]="!copied()"
                    [class.fa-check]="copied()"
                    [class.text-emerald-400]="copied()"
                  ></i>
                  <span>{{ copied() ? 'Copied!' : 'Copy Email' }}</span>
                </button>
              </div>
            </div>

            <!-- Contact Info Grid -->
            <div class="lg:col-span-5 grid grid-cols-1 gap-3">
              <a
                [href]="'mailto:' + profile.email"
                class="flex items-center justify-between p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 hover:border-zinc-700 transition-colors group"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span class="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
                    <i class="fa-regular fa-envelope text-sm"></i>
                  </span>
                  <div class="min-w-0">
                    <p class="text-[11px] font-mono text-zinc-500">Email</p>
                    <p class="text-sm text-zinc-200 truncate group-hover:text-white">{{ profile.email }}</p>
                  </div>
                </div>
                <i class="fa-solid fa-arrow-up-right-from-square text-xs text-zinc-600 group-hover:text-zinc-300"></i>
              </a>

              <a
                [href]="'tel:' + profile.phone"
                class="flex items-center justify-between p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 hover:border-zinc-700 transition-colors group"
              >
                <div class="flex items-center gap-3">
                  <span class="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
                    <i class="fa-solid fa-phone text-sm"></i>
                  </span>
                  <div>
                    <p class="text-[11px] font-mono text-zinc-500">Phone</p>
                    <p class="text-sm text-zinc-200 group-hover:text-white">{{ profile.phoneDisplay }}</p>
                  </div>
                </div>
                <i class="fa-solid fa-arrow-up-right-from-square text-xs text-zinc-600 group-hover:text-zinc-300"></i>
              </a>

              <a
                [href]="profile.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 hover:border-zinc-700 transition-colors group"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span class="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
                    <i class="fa-brands fa-linkedin-in text-sm"></i>
                  </span>
                  <div class="min-w-0">
                    <p class="text-[11px] font-mono text-zinc-500">LinkedIn</p>
                    <p class="text-sm text-zinc-200 truncate group-hover:text-white">{{ profile.linkedinLabel }}</p>
                  </div>
                </div>
                <i class="fa-solid fa-arrow-up-right-from-square text-xs text-zinc-600 group-hover:text-zinc-300"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="border-t border-zinc-900 py-6">
      <div class="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <p>&copy; {{ currentYear }} {{ profile.name }}. Engineered with Angular &amp; Tailwind CSS.</p>
        <div class="flex items-center gap-5">
          <a [href]="profile.githubUrl" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-200 transition-colors">
            GitHub
          </a>
          <a [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-200 transition-colors">
            LinkedIn
          </a>
          <a [href]="'mailto:' + profile.email" class="hover:text-zinc-200 transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class ContactComponent {
  readonly profile = PROFILE_INFO;
  readonly currentYear = new Date().getFullYear();
  readonly copied = signal(false);

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2200);
    } catch {
      window.location.href = `mailto:${this.profile.email}`;
    }
  }
}
