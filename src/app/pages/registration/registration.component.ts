import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, HeroComponent],
  template: `
    <app-hero
      eyebrow="Anmeldung"
      title="Platz für Ihr Kind"
      subtitle="Erfahren Sie, wie Sie Ihr Kind bei uns anmelden können und welche Schritte dafür nötig sind."
      [ctas]="[
        { label: 'Kontakt aufnehmen', link: '/kontakt', primary: true }
      ]"
      size="small"
    />

    <section class="content-section">
      <div class="container">
        <div class="content-grid">
          <div class="content-main">
            <h2>So funktioniert die Anmeldung</h2>
            <p>
              Wir freuen uns über Ihr Interesse an unserer Kita. Da wir eine begrenzte
              Anzahl von 45 Plätzen haben, empfehlen wir eine frühzeitige Kontaktaufnahme.
            </p>

            <div class="steps">
              <div class="step">
                <span class="step-number">1</span>
                <div class="step-content">
                  <h3>Erstkontakt</h3>
                  <p>
                    Nehmen Sie Kontakt mit uns auf – per E-Mail oder telefonisch während
                    unserer Bürozeiten (15:00–16:00 Uhr). Teilen Sie uns mit, ab wann Sie
                    einen Platz benötigen.
                  </p>
                </div>
              </div>

              <div class="step">
                <span class="step-number">2</span>
                <div class="step-content">
                  <h3>Kennenlernen</h3>
                  <p>
                    Wir laden Sie und Ihr Kind zu einem persönlichen Kennenlerntermin ein.
                    So können Sie unsere Räume und unser Team kennenlernen.
                  </p>
                </div>
              </div>

              <div class="step">
                <span class="step-number">3</span>
                <div class="step-content">
                  <h3>Anmeldeunterlagen</h3>
                  <p>
                    Bei gegenseitigem Interesse erhalten Sie die Anmeldeunterlagen.
                    Diese umfassen den Betreuungsvertrag und wichtige Informationen.
                  </p>
                </div>
              </div>

              <div class="step">
                <span class="step-number">4</span>
                <div class="step-content">
                  <h3>Eingewöhnung</h3>
                  <p>
                    Die Eingewöhnung erfolgt behutsam nach dem Berliner Modell.
                    Ein Elternteil begleitet das Kind in den ersten Wochen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside class="content-sidebar">
            <div class="info-card">
              <h4>Aufnahmekriterien</h4>
              <ul>
                <li>Mindestalter: 12 Monate</li>
                <li>Interesse an mehrsprachiger Erziehung</li>
                <li>Bereitschaft zur aktiven Elternbeteiligung</li>
              </ul>
            </div>

            <div class="info-card highlight">
              <h4>Kernzeiten</h4>
              <p class="times">09:00 – 15:00 Uhr</p>
              <p class="note">
                Während der Kernzeiten bitten wir, keine telefonischen Anfragen
                zu stellen, außer in Notfällen.
              </p>
            </div>

            <div class="info-card">
              <h4>Bürozeiten</h4>
              <p class="times">15:00 – 16:00 Uhr</p>
              <p class="note">
                Für Anfragen und Terminvereinbarungen stehen wir Ihnen in
                dieser Zeit gerne zur Verfügung.
              </p>
            </div>

            <div class="cta-card">
              <h4>Fragen?</h4>
              <p>Wir helfen Ihnen gerne weiter.</p>
              <a routerLink="/kontakt" class="btn btn-primary">Kontakt</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .content-section {
      padding: 5rem 1.5rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 4rem;
    }

    .content-main h2 {
      font-size: 2rem;
      color: var(--color-text);
      margin: 0 0 1rem;
    }

    .content-main > p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--color-text-muted);
      margin: 0 0 3rem;
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .step {
      display: flex;
      gap: 1.5rem;
    }

    .step-number {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      background: var(--color-primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.25rem;
    }

    .step-content h3 {
      font-size: 1.25rem;
      margin: 0 0 0.5rem;
      color: var(--color-text);
    }

    .step-content p {
      color: var(--color-text-muted);
      line-height: 1.7;
      margin: 0;
    }

    .content-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-card,
    .cta-card {
      background: var(--color-light);
      padding: 1.75rem;
      border-radius: 12px;
    }

    .info-card.highlight {
      background: var(--color-primary);
      color: white;
    }

    .info-card.highlight .note {
      color: rgba(255, 255, 255, 0.8);
    }

    .info-card h4,
    .cta-card h4 {
      font-size: 1rem;
      margin: 0 0 1rem;
    }

    .info-card ul {
      margin: 0;
      padding: 0 0 0 1.25rem;
    }

    .info-card li {
      color: var(--color-text-muted);
      line-height: 1.7;
      margin-bottom: 0.5rem;
    }

    .info-card li:last-child {
      margin-bottom: 0;
    }

    .times {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.75rem;
    }

    .note {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin: 0;
    }

    .cta-card p {
      color: var(--color-text-muted);
      margin: 0 0 1.25rem;
      line-height: 1.6;
    }

    .btn {
      display: inline-block;
      padding: 0.875rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: var(--color-primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--color-primary-dark);
    }

    @media (max-width: 900px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .content-sidebar {
        flex-direction: row;
        flex-wrap: wrap;
      }

      .info-card,
      .cta-card {
        flex: 1;
        min-width: 250px;
      }
    }

    @media (max-width: 600px) {
      .step {
        flex-direction: column;
        gap: 1rem;
      }

      .content-sidebar {
        flex-direction: column;
      }

      .info-card,
      .cta-card {
        min-width: auto;
      }
    }
  `]
})
export class RegistrationComponent {}
