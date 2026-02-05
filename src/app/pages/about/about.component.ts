import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, HeroComponent],
  template: `
    <app-hero
      eyebrow="Über uns"
      title="Unsere Geschichte"
      subtitle="Seit 2007 fördern wir Kinder in einer mehrsprachigen, weltoffenen Umgebung."
      [ctas]="[
        { label: 'Unser Team kennenlernen', link: '/team', primary: true }
      ]"
      size="small"
    />

    <section class="content-section">
      <div class="container">
        <div class="content-grid">
          <div class="content-main">
            <h2>Die erste Europa-Kita Berlins</h2>
            <p>
              Am 1. September 2007 wurde die Kita Casa Azul – Maison Bleue als erste
              Drei-Nationen-Europa-Kita in Berlin eröffnet. Unsere Einrichtung befindet sich
              in unmittelbarer Nähe der Charité, der Humboldt-Universität, des Parlaments
              und der deutsch-portugiesischen Europaschule Neues Tor.
            </p>
            <p>
              Träger der Kita ist der gemeinnützige Verein Casa Azul – Blaues Haus e.V.,
              der sich der Förderung einer europäischen Bildung und Erziehung verschrieben hat.
            </p>

            <h3>Unser pädagogisches Konzept</h3>
            <p>
              Unsere Pädagogik zielt darauf ab, die soziale Vorstellungskraft und Intelligenz
              zu fördern sowie Weltoffenheit und Internationalität zu vermitteln. Gleichzeitig
              legen wir Wert auf die Entwicklung technisch-wirtschaftlicher sowie
              kulturell-künstlerischer Kreativität.
            </p>

            <h3>Mehrsprachigkeit als Chance</h3>
            <p>
              Bei Casa Azul lernen Kinder spielerisch drei Sprachen: Deutsch, Französisch
              und Portugiesisch. Durch den täglichen Kontakt mit muttersprachlichen
              Erzieher:innen entwickeln sie ein natürliches Sprachgefühl und interkulturelle
              Kompetenz.
            </p>
          </div>

          <aside class="content-sidebar">
            <div class="info-card">
              <h4>Auf einen Blick</h4>
              <dl>
                <dt>Gegründet</dt>
                <dd>1. September 2007</dd>

                <dt>Plätze</dt>
                <dd>45 Kinder</dd>

                <dt>Alter</dt>
                <dd>Ab 12 Monaten</dd>

                <dt>Sprachen</dt>
                <dd>Deutsch, Französisch, Portugiesisch</dd>

                <dt>Träger</dt>
                <dd>Casa Azul – Blaues Haus e.V.</dd>
              </dl>
            </div>

            <div class="cta-card">
              <h4>Interesse geweckt?</h4>
              <p>Erfahren Sie mehr über unseren Anmeldeprozess.</p>
              <a routerLink="/anmeldung" class="btn btn-primary">Zur Anmeldung</a>
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
      margin: 0 0 1.5rem;
    }

    .content-main h3 {
      font-size: 1.5rem;
      color: var(--color-text);
      margin: 2.5rem 0 1rem;
    }

    .content-main p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--color-text-muted);
      margin: 0 0 1.5rem;
    }

    .content-sidebar {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .info-card,
    .cta-card {
      background: var(--color-light);
      padding: 2rem;
      border-radius: 12px;
    }

    .info-card h4,
    .cta-card h4 {
      font-size: 1.1rem;
      margin: 0 0 1.5rem;
      color: var(--color-text);
    }

    .info-card dl {
      margin: 0;
    }

    .info-card dt {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-muted);
      margin-bottom: 0.25rem;
    }

    .info-card dd {
      margin: 0 0 1.25rem;
      font-weight: 500;
      color: var(--color-text);
    }

    .info-card dd:last-child {
      margin-bottom: 0;
    }

    .cta-card p {
      color: var(--color-text-muted);
      margin: 0 0 1.5rem;
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
        min-width: 280px;
      }
    }

    @media (max-width: 600px) {
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
export class AboutComponent {}
