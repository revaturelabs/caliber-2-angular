import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traineeToggle'
})
export class TraineeTogglePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
