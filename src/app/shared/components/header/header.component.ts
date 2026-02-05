import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-container">
        <a routerLink="/" class="logo">
          <span class="logo-icon">🏠</span>
          <span class="logo-text">Casa Azul</span>
        </a>

        <button class="mobile-toggle" (click)="toggleMenu()" [attr.aria-expanded]="isMenuOpen">
          <span class="hamburger"></span>
        </button>

        <nav class="nav" [class.open]="isMenuOpen">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Start</a>
          <a routerLink="/ueber-uns" routerLinkActive="active" (click)="closeMenu()">Über uns</a>
          <a routerLink="/team" routerLinkActive="active" (click)="closeMenu()">Team</a>
          <a routerLink="/anmeldung" routerLinkActive="active" (click)="closeMenu()">Anmeldung</a>
          <a routerLink="/kontakt" routerLinkActive="active" (click)="closeMenu()">Kontakt</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--color-border);
      z-index: 1000;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: var(--color-primary);
      font-weight: 600;
      font-size: 1.25rem;
    }

    .logo-icon {
      font-size: 1.5rem;
    }

    .nav {
      display: flex;
      gap: 2rem;
    }

    .nav a {
      text-decoration: none;
      color: var(--color-text);
      font-weight: 500;
      font-size: 0.95rem;
      padding: 0.5rem 0;
      position: relative;
      transition: color 0.2s ease;
    }

    .nav a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-primary);
      transition: width 0.2s ease;
    }

    .nav a:hover,
    .nav a.active {
      color: var(--color-primary);
    }

    .nav a.active::after,
    .nav a:hover::after {
      width: 100%;
    }

    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
    }

    .hamburger {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--color-text);
      position: relative;
    }

    .hamburger::before,
    .hamburger::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background: var(--color-text);
      left: 0;
    }

    .hamburger::before {
      top: -8px;
    }

    .hamburger::after {
      top: 8px;
    }

    @media (max-width: 768px) {
      .mobile-toggle {
        display: block;
      }

      .nav {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background: white;
        padding: 1rem 1.5rem;
        gap: 0;
        border-bottom: 1px solid var(--color-border);
        display: none;
      }

      .nav.open {
        display: flex;
      }

      .nav a {
        padding: 1rem 0;
        border-bottom: 1px solid var(--color-border);
      }

      .nav a:last-child {
        border-bottom: none;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
