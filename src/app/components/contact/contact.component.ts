import { Component, signal } from '@angular/core';
import { PROFILE_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section id="contact" class="py-12 sm:py-16 transition-colors duration-200">
      <div class="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        <div class="rounded-3xl bg-white dark:bg-zinc-900/80 border border-[#e8e4dc] dark:border-zinc-800 p-7 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl shadow-[#0f172a]/5 dark:shadow-black/40">
          <div
            class="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#1e3a8a]/8 dark:bg-orange-500/10 blur-[110px]"
          ></div>
          <div
            class="pointer-events-none absolute -top-24 -left-24 w-60 h-60 rounded-full bg-amber-500/8 dark:bg-amber-500/10 blur-[90px]"
          ></div>

          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-7 space-y-4">
              <p class="text-xs font-mono uppercase tracking-widest text-[#1e3a8a] dark:text-orange-400 font-semibold">
                05 / Direct Inquiry
              </p>
              <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] dark:text-zinc-50">
                Let's build something resilient together.
              </h2>
              <p class="text-[#475569] dark:text-zinc-300 text-base leading-relaxed max-w-xl font-normal">
                Open to backend architecture roles, full-stack (.NET Core &amp; Angular) discussions, product engineering positions, or technical collaborations.
              </p>

              <div class="flex flex-wrap items-center gap-3 pt-2">
                <a
                  [href]="'mailto:' + profile.email"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1e3a8a] hover:bg-[#172554] dark:bg-orange-500 dark:hover:bg-orange-400 text-white dark:text-zinc-950 text-sm font-bold transition-colors shadow-md shadow-[#1e3a8a]/20 dark:shadow-orange-500/15"
                >
                  <i class="fa-regular fa-envelope"></i>
                  <span>Send an Email</span>
                </a>

                <a
                  [href]="profile.resumeUrl"
                  [attr.download]="profile.resumeFileName"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-[#c7d2fe] dark:border-orange-500/40 text-[#1e3a8a] dark:text-orange-300 text-sm font-semibold hover:bg-[#eef2ff] dark:hover:bg-zinc-800 transition-colors shadow-xs"
                >
                  <i class="fa-solid fa-file-arrow-down text-xs"></i>
                  <span>Download Resume</span>
                </a>

                <button
                  type="button"
                  (click)="copyEmail()"
                  class="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-[#e8e4dc] dark:border-zinc-800 text-[#334155] dark:text-zinc-200 text-sm font-medium hover:bg-[#f8f6f0] dark:hover:bg-zinc-800 transition-colors shadow-xs"
                >
                  <i
                    class="fa-regular"
                    [class.fa-copy]="!copied()"
                    [class.fa-check]="copied()"
                    [class.text-[#1e3a8a]]="copied()"
                    [class.dark:text-orange-400]="copied()"
                  ></i>
                  <span>{{ copied() ? 'Copied!' : 'Copy Email' }}</span>
                </button>
              </div>
            </div>

            <!-- Contact Info Grid -->
            <div class="lg:col-span-5 grid grid-cols-1 gap-3">
              <a
                [href]="'mailto:' + profile.email"
                class="flex items-center justify-between p-4 rounded-xl bg-[#faf8f5] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 hover:border-[#c7d2fe] dark:hover:border-zinc-700 transition-colors group shadow-2xs"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span class="w-9 h-9 rounded-lg bg-[#eef2ff] dark:bg-zinc-800 border border-[#c7d2fe] dark:border-zinc-700 flex items-center justify-center text-[#1e3a8a] dark:text-orange-400">
                    <i class="fa-regular fa-envelope text-sm"></i>
                  </span>
                  <div class="min-w-0">
                    <p class="text-[11px] font-mono text-[#64748b] dark:text-zinc-400 font-medium">Email</p>
                    <p class="text-sm font-semibold text-[#0f172a] dark:text-zinc-200 truncate group-hover:text-[#1e3a8a] dark:group-hover:text-white">{{ profile.email }}</p>
                  </div>
                </div>
                <i class="fa-solid fa-arrow-up-right-from-square text-xs text-[#94a3b8] dark:text-slate-500 group-hover:text-[#1e3a8a] dark:group-hover:text-zinc-300"></i>
              </a>

              <a
                [href]="'tel:' + profile.phone"
                class="flex items-center justify-between p-4 rounded-xl bg-[#faf8f5] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 hover:border-[#c7d2fe] dark:hover:border-zinc-700 transition-colors group shadow-2xs"
              >
                <div class="flex items-center gap-3">
                  <span class="w-9 h-9 rounded-lg bg-[#eef2ff] dark:bg-zinc-800 border border-[#c7d2fe] dark:border-zinc-700 flex items-center justify-center text-[#1e3a8a] dark:text-orange-400">
                    <i class="fa-solid fa-phone text-sm"></i>
                  </span>
                  <div>
                    <p class="text-[11px] font-mono text-[#64748b] dark:text-zinc-400 font-medium">Phone</p>
                    <p class="text-sm font-semibold text-[#0f172a] dark:text-zinc-200 group-hover:text-[#1e3a8a] dark:group-hover:text-white">{{ profile.phoneDisplay }}</p>
                  </div>
                </div>
                <i class="fa-solid fa-arrow-up-right-from-square text-xs text-[#94a3b8] dark:text-slate-500 group-hover:text-[#1e3a8a] dark:group-hover:text-zinc-300"></i>
              </a>

              <a
                [href]="profile.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-4 rounded-xl bg-[#faf8f5] dark:bg-zinc-950/80 border border-[#e8e4dc] dark:border-zinc-800 hover:border-[#c7d2fe] dark:hover:border-zinc-700 transition-colors group shadow-2xs"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span class="w-9 h-9 rounded-lg bg-[#eef2ff] dark:bg-zinc-800 border border-[#c7d2fe] dark:border-zinc-700 flex items-center justify-center text-[#1e3a8a] dark:text-orange-400">
                    <i class="fa-brands fa-linkedin-in text-sm"></i>
                  </span>
                  <div class="min-w-0">
                    <p class="text-[11px] font-mono text-[#64748b] dark:text-zinc-400 font-medium">LinkedIn</p>
                    <p class="text-sm font-semibold text-[#0f172a] dark:text-zinc-200 truncate group-hover:text-[#1e3a8a] dark:group-hover:text-white">{{ profile.linkedinLabel }}</p>
                  </div>
                </div>
                <i class="fa-solid fa-arrow-up-right-from-square text-xs text-[#94a3b8] dark:text-slate-500 group-hover:text-[#1e3a8a] dark:group-hover:text-zinc-300"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="border-t border-[#e8e4dc] dark:border-zinc-800 py-6 transition-colors duration-200">
      <div class="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b] dark:text-zinc-400">
        <p>&copy; {{ currentYear }} {{ profile.name }}. Engineered with Angular &amp; Tailwind CSS.</p>
        <div class="flex items-center gap-5">
          <a [href]="profile.githubUrl" target="_blank" rel="noopener noreferrer" class="hover:text-[#1e3a8a] dark:hover:text-white transition-colors">
            GitHub
          </a>
          <a [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer" class="hover:text-[#1e3a8a] dark:hover:text-white transition-colors">
            LinkedIn
          </a>
          <a [href]="'mailto:' + profile.email" class="hover:text-[#1e3a8a] dark:hover:text-white transition-colors">
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
