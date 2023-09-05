import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDash'
})
export class AddDashPipe implements PipeTransform {

  transform(value: string): string {
    return value.match(/.{1,4}/g).join('-');
  }

}
