import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, HeroComponent],
  template: `
    <app-hero
      eyebrow="Kontakt"
      title="Wir freuen uns auf Sie"
      subtitle="Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Kontaktieren Sie uns gerne."
      size="small"
    />

    <section class="content-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>So erreichen Sie uns</h2>

            <div class="info-cards">
              <div class="info-card">
                <span class="info-icon">📍</span>
                <h3>Adresse</h3>
                <p>
                  Kita Casa Azul – Maison Bleue<br>
                  Reinhardtstr. 31<br>
                  10117 Berlin
                </p>
              </div>

              <div class="info-card">
                <span class="info-icon">🕐</span>
                <h3>Bürozeiten</h3>
                <p>
                  Montag – Freitag<br>
                  15:00 – 16:00 Uhr
                </p>
                <p class="note">
                  Telefonische Anfragen bitte nur außerhalb der Kernzeiten (09:00–15:00).
                </p>
              </div>

              <div class="info-card">
                <span class="info-icon">📧</span>
                <h3>E-Mail</h3>
                <p>
                  <a href="mailto:info&#64;eukita-casa-azul.de">info&#64;eukita-casa-azul.de</a>
                </p>
              </div>
            </div>

            <div class="map-placeholder">
              <div class="map-content">
                <span class="map-icon">🗺️</span>
                <p>Reinhardtstr. 31, 10117 Berlin</p>
                <a
                  href="https://maps.google.com/?q=Reinhardtstr.+31,+10117+Berlin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-outline"
                >
                  In Google Maps öffnen
                </a>
              </div>
            </div>
          </div>

          <div class="contact-form-section">
            <div class="form-card">
              <h2>Nachricht senden</h2>
              <p>Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen.</p>

              <form class="contact-form">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" required>
                </div>

                <div class="form-group">
                  <label for="email">E-Mail</label>
                  <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                  <label for="phone">Telefon (optional)</label>
                  <input type="tel" id="phone" name="phone">
                </div>

                <div class="form-group">
                  <label for="subject">Betreff</label>
                  <select id="subject" name="subject" required>
                    <option value="">Bitte wählen</option>
                    <option value="anmeldung">Anmeldung / Platzvergabe</option>
                    <option value="besichtigung">Besichtigungstermin</option>
                    <option value="bewerbung">Bewerbung</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Nachricht</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-full">
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>
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

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }

    .contact-info h2,
    .form-card h2 {
      font-size: 1.75rem;
      color: var(--color-text);
      margin: 0 0 1.5rem;
    }

    .info-cards {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .info-card {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-icon {
      font-size: 1.5rem;
    }

    .info-card h3 {
      font-size: 1rem;
      margin: 0;
      color: var(--color-text);
    }

    .info-card p {
      margin: 0;
      color: var(--color-text-muted);
      line-height: 1.7;
    }

    .info-card a {
      color: var(--color-primary);
      text-decoration: none;
    }

    .info-card a:hover {
      text-decoration: underline;
    }

    .info-card .note {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-top: 0.5rem;
    }

    .map-placeholder {
      background: var(--color-light);
      border-radius: 12px;
      padding: 3rem;
      text-align: center;
    }

    .map-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .map-icon {
      font-size: 3rem;
    }

    .map-content p {
      margin: 0;
      color: var(--color-text-muted);
    }

    .form-card {
      background: var(--color-light);
      padding: 2.5rem;
      border-radius: 16px;
    }

    .form-card > p {
      color: var(--color-text-muted);
      margin: 0 0 2rem;
      line-height: 1.6;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.875rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      background: white;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .btn {
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
    }

    .btn-primary {
      background: var(--color-primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--color-primary-dark);
    }

    .btn-outline {
      background: transparent;
      color: var(--color-primary);
      border: 2px solid var(--color-primary);
    }

    .btn-outline:hover {
      background: var(--color-primary);
      color: white;
    }

    .btn-full {
      width: 100%;
    }

    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }
  `]
})
export class ContactComponent {}
