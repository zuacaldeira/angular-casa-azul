import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-main">
          <div class="footer-brand">
            <span class="logo-icon">🏠</span>
            <span class="logo-text">Casa Azul – Maison Bleue</span>
            <p class="tagline">Europa-Kita in Berlin</p>
          </div>

          <div class="footer-links">
            <div class="footer-column">
              <h4>Navigation</h4>
              <a routerLink="/">Start</a>
              <a routerLink="/ueber-uns">Über uns</a>
              <a routerLink="/team">Team</a>
            </div>

            <div class="footer-column">
              <h4>Service</h4>
              <a routerLink="/anmeldung">Anmeldung</a>
              <a routerLink="/kontakt">Kontakt</a>
            </div>

            <div class="footer-column">
              <h4>Kontakt</h4>
              <p>Reinhardtstr. 31</p>
              <p>10117 Berlin</p>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Casa Azul – Blaues Haus e.V.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-text);
      color: white;
      padding: 4rem 1.5rem 2rem;
      margin-top: auto;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-main {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .logo-icon {
      font-size: 2rem;
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .tagline {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
      margin: 0;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .footer-column h4 {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 0 0 1rem;
      color: rgba(255, 255, 255, 0.5);
    }

    .footer-column a,
    .footer-column p {
      display: block;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      font-size: 0.95rem;
      margin: 0 0 0.5rem;
      transition: color 0.2s ease;
    }

    .footer-column a:hover {
      color: white;
    }

    .footer-bottom {
      padding-top: 2rem;
      text-align: center;
    }

    .footer-bottom p {
      margin: 0;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
      .footer-main {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .footer-links {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 480px) {
      .footer-links {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
