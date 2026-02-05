import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeroComponent],
  template: `
    <app-hero
      eyebrow="Europa-Kita in Berlin"
      title="Willkommen bei Casa Azul"
      subtitle="Eine mehrsprachige Kindertagesstätte im Herzen Berlins, wo Kinder spielerisch Deutsch, Französisch und Portugiesisch entdecken."
      [ctas]="[
        { label: 'Jetzt anmelden', link: '/anmeldung', primary: true },
        { label: 'Mehr erfahren', link: '/ueber-uns' }
      ]"
      size="large"
    />

    <section class="features">
      <div class="container">
        <div class="features-grid">
          <div class="feature-card">
            <span class="feature-icon">🌍</span>
            <h3>Mehrsprachig</h3>
            <p>Deutsch, Französisch und Portugiesisch – Ihre Kinder lernen spielerisch drei Sprachen.</p>
          </div>

          <div class="feature-card">
            <span class="feature-icon">👨‍👩‍👧‍👦</span>
            <h3>Familiär</h3>
            <p>Mit 45 Kindern schaffen wir eine persönliche Atmosphäre, in der jedes Kind gesehen wird.</p>
          </div>

          <div class="feature-card">
            <span class="feature-icon">📍</span>
            <h3>Zentral</h3>
            <p>Direkt an der Reinhardtstraße, nahe Charité und Humboldt-Universität.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-preview">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <span class="section-eyebrow">Seit 2007</span>
            <h2>Die erste Drei-Nationen-Kita Berlins</h2>
            <p>
              Am 1. September 2007 wurde die Kita Casa Azul – Maison Bleue als erste Europa-Kita
              in Berlin eröffnet. Unser pädagogisches Konzept fördert soziale Intelligenz,
              Weltoffenheit und kulturelle Kreativität.
            </p>
            <a routerLink="/ueber-uns" class="text-link">
              Mehr über uns erfahren →
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Haben Sie Fragen?</h2>
          <p>Wir freuen uns auf Ihre Nachricht und beantworten gerne alle Fragen zur Anmeldung.</p>
          <div class="cta-buttons">
            <a routerLink="/kontakt" class="btn btn-primary">Kontakt aufnehmen</a>
            <a routerLink="/anmeldung" class="btn btn-outline">Anmeldung</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .features {
      padding: 6rem 1.5rem;
      background: var(--color-light);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    }

    .feature-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 1.5rem;
    }

    .feature-card h3 {
      font-size: 1.25rem;
      margin: 0 0 1rem;
      color: var(--color-text);
    }

    .feature-card p {
      color: var(--color-text-muted);
      line-height: 1.7;
      margin: 0;
    }

    .about-preview {
      padding: 6rem 1.5rem;
    }

    .about-content {
      max-width: 700px;
    }

    .section-eyebrow {
      display: inline-block;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-primary);
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .about-text h2 {
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      margin: 0 0 1.5rem;
      color: var(--color-text);
      line-height: 1.3;
    }

    .about-text p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--color-text-muted);
      margin: 0 0 1.5rem;
    }

    .text-link {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .text-link:hover {
      text-decoration: underline;
    }

    .cta-section {
      padding: 6rem 1.5rem;
      background: var(--color-primary);
      color: white;
      text-align: center;
    }

    .cta-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .cta-content h2 {
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      margin: 0 0 1rem;
    }

    .cta-content p {
      font-size: 1.1rem;
      opacity: 0.9;
      margin: 0 0 2rem;
      line-height: 1.7;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: white;
      color: var(--color-primary);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn-outline {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .btn-outline:hover {
      border-color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
      }

      .cta-buttons {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class HomeComponent {}
