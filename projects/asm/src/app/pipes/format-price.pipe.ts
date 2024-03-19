import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
  standalone: true,
})
export class FormatPricePipe implements PipeTransform {
  transform(value: number): string {
    let format = new Intl.NumberFormat().format(value);
    return format;
  }
}
