import { Component, HostListener } from '@angular/core';
import { SkillNameComponent } from './skill-name/skill-name.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SkillNameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sahil Mankar - Software Engineer';
  isMenuOpen = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMenu();
  }
}
