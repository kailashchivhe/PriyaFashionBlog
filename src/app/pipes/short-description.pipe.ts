import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    let trimmed = value.substring(0,200);
    return trimmed+"....";
  }

}
