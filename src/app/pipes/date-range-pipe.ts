import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange',
})
export class DateRangePipe implements PipeTransform {
  transform(value: { checkIn: Date; checkOut: Date } | null | undefined): string {
    if (!value) {
      return '';
    }

    const checkIn = new Date(value.checkIn);
    const checkOut = new Date(value.checkOut);

    const diffTime = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const checkInMonth = months[checkIn.getMonth()];
    const checkInDay = checkIn.getDate();
    const checkOutMonth = months[checkOut.getMonth()];
    const checkOutDay = checkOut.getDate();
    const year = checkOut.getFullYear();

    return `${checkInMonth} ${checkInDay} - ${checkOutMonth} ${checkOutDay}, ${year} (${nights} nights)`;
  }
}
