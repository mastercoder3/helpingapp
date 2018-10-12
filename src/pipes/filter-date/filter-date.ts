import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterDatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterDate',
})
export class FilterDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return new Date(value).toDateString();
  }
}
