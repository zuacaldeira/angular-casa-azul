import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../models/kindergarten.model';

@Pipe({
  name: 'languageLabel',
})
export class LanguageLabelPipe implements PipeTransform {
  private readonly labels: Record<Language, string> = {
    de: 'Deutsch',
    pt: 'Portugu\u00eas',
    fr: 'Fran\u00e7ais',
  };

  transform(value: Language | null | undefined): string {
    if (!value) {
      return '';
    }
    return this.labels[value] ?? value;
  }
}
