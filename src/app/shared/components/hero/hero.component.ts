import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface HeroCTA {
  label: string;
  link: string;
  primary?: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero" [class.hero-large]="size === 'large'" [class.hero-small]="size === 'small'">
      <div class="hero-container">
        <span class="hero-eyebrow" *ngIf="eyebrow">{{ eyebrow }}</span>
        <h1 class="hero-title">{{ title }}</h1>
        <p class="hero-subtitle" *ngIf="subtitle">{{ subtitle }}</p>

        <div class="hero-ctas" *ngIf="ctas.length > 0">
          @for (cta of ctas; track cta.label) {
            <a
              [routerLink]="cta.link"
              class="cta-button"
              [class.cta-primary]="cta.primary"
              [class.cta-secondary]="!cta.primary"
            >
              {{ cta.label }}
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
      color: white;
      padding: 8rem 1.5rem 6rem;
      text-align: center;
    }

    .hero-large {
      padding: 10rem 1.5rem 8rem;
    }

    .hero-small {
      padding: 7rem 1.5rem 4rem;
    }

    .hero-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-eyebrow {
      display: inline-block;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      opacity: 0.9;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .hero-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      line-height: 1.2;
      margin: 0 0 1.5rem;
      letter-spacing: -0.02em;
    }

    .hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      line-height: 1.7;
      opacity: 0.9;
      margin: 0 0 2.5rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-ctas {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .cta-button {
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .cta-primary {
      background: white;
      color: var(--color-primary);
    }

    .cta-primary:hover {
      background: var(--color-light);
      transform: translateY(-2px);
    }

    .cta-secondary {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .cta-secondary:hover {
      border-color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 480px) {
      .hero-ctas {
        flex-direction: column;
      }

      .cta-button {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class HeroComponent {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() ctas: HeroCTA[] = [];
  @Input() size: 'large' | 'normal' | 'small' = 'normal';
}
