import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';

interface TeamMember {
  name: string;
  role: string;
  languages: string[];
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterLink, HeroComponent],
  template: `
    <app-hero
      eyebrow="Unser Team"
      title="Menschen, die inspirieren"
      subtitle="Unser engagiertes Team aus erfahrenen Pädagog:innen begleitet Ihre Kinder mit Herz und Kompetenz."
      [ctas]="[
        { label: 'Kontakt aufnehmen', link: '/kontakt', primary: true }
      ]"
      size="small"
    />

    <section class="content-section">
      <div class="container">
        <div class="intro">
          <h2>Vielfalt als Stärke</h2>
          <p>
            Unser Team besteht aus qualifizierten Erzieher:innen mit unterschiedlichen
            kulturellen Hintergründen. Gemeinsam schaffen wir eine warmherzige, anregende
            Umgebung, in der sich jedes Kind entfalten kann.
          </p>
        </div>

        <div class="team-grid">
          @for (member of teamMembers; track member.name) {
            <div class="team-card">
              <div class="member-avatar">
                {{ getInitials(member.name) }}
              </div>
              <h3>{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <div class="member-languages">
                @for (lang of member.languages; track lang) {
                  <span class="language-tag">{{ lang }}</span>
                }
              </div>
            </div>
          }
        </div>

        <div class="join-section">
          <h2>Teil unseres Teams werden</h2>
          <p>
            Sie sind Erzieher:in mit Leidenschaft für mehrsprachige Bildung?
            Wir freuen uns über Ihre Initiativbewerbung.
          </p>
          <a routerLink="/kontakt" class="btn btn-outline">Jetzt bewerben</a>
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

    .intro {
      max-width: 700px;
      margin-bottom: 4rem;
    }

    .intro h2 {
      font-size: 2rem;
      color: var(--color-text);
      margin: 0 0 1rem;
    }

    .intro p {
      font-size: 1.15rem;
      line-height: 1.8;
      color: var(--color-text-muted);
      margin: 0;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 5rem;
    }

    .team-card {
      background: var(--color-light);
      padding: 2.5rem;
      border-radius: 12px;
      text-align: center;
    }

    .member-avatar {
      width: 80px;
      height: 80px;
      background: var(--color-primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 auto 1.5rem;
    }

    .team-card h3 {
      font-size: 1.25rem;
      margin: 0 0 0.5rem;
      color: var(--color-text);
    }

    .member-role {
      color: var(--color-text-muted);
      margin: 0 0 1rem;
      font-size: 0.95rem;
    }

    .member-languages {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .language-tag {
      background: white;
      padding: 0.35rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }

    .join-section {
      background: var(--color-light);
      padding: 4rem;
      border-radius: 16px;
      text-align: center;
    }

    .join-section h2 {
      font-size: 1.75rem;
      margin: 0 0 1rem;
      color: var(--color-text);
    }

    .join-section p {
      color: var(--color-text-muted);
      margin: 0 0 2rem;
      font-size: 1.1rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .btn {
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
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
  `]
})
export class TeamComponent {
  teamMembers: TeamMember[] = [
    { name: 'Maria Santos', role: 'Kita-Leitung', languages: ['Deutsch', 'Portugiesisch'] },
    { name: 'Claire Dubois', role: 'Stellv. Leitung', languages: ['Deutsch', 'Französisch'] },
    { name: 'Anna Müller', role: 'Erzieherin', languages: ['Deutsch', 'Englisch'] },
    { name: 'João Silva', role: 'Erzieher', languages: ['Deutsch', 'Portugiesisch'] },
    { name: 'Sophie Martin', role: 'Erzieherin', languages: ['Deutsch', 'Französisch'] },
    { name: 'Lisa Weber', role: 'Erzieherin', languages: ['Deutsch', 'Portugiesisch'] }
  ];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }
}
