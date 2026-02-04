import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(dateOfBirth: Date | string | null | undefined): string {
    if (!dateOfBirth) {
      return '';
    }

    const birth = new Date(dateOfBirth);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      years--;
    }

    if (years < 0) {
      return '';
    }

    const months = monthDiff < 0 ? 12 + monthDiff : monthDiff;

    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }

    if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }

    return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
  }
}
