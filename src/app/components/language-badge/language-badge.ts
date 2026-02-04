import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language } from '../../models/kindergarten.model';

@Component({
  selector: 'app-language-badge',
  imports: [CommonModule],
  templateUrl: './language-badge.html',
  styleUrl: './language-badge.scss',
})
export class LanguageBadge {
  @Input() language: Language = 'de';

  get label(): string {
    const labels: Record<Language, string> = {
      de: 'Deutsch',
      pt: 'Portugu\u00eas',
      fr: 'Fran\u00e7ais',
    };
    return labels[this.language] ?? this.language;
  }

  get flag(): string {
    const flags: Record<Language, string> = {
      de: '\uD83C\uDDE9\uD83C\uDDEA',
      pt: '\uD83C\uDDF5\uD83C\uDDF9',
      fr: '\uD83C\uDDEB\uD83C\uDDF7',
    };
    return flags[this.language] ?? '';
  }
}
