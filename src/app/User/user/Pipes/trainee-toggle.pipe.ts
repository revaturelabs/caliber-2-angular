import { Pipe, PipeTransform } from '@angular/core';
import {Trainee} from "../../../domain/model/trainee.dto";

 /**
   * Checks to see if 'show' is true or false
   * true will show all trainees that are not dropped
   * false will show all trainees that are dropped
   */
@Pipe({
  name: 'traineeToggle'
})
export class TraineeTogglePipe implements PipeTransform {
  transform(trainees: Trainee[], show: boolean): Array<Trainee> {
    if (!trainees) {return []; }
    if (show) {
      return trainees.filter(trainee => trainee.trainingStatus !== 'Dropped');
    }
    return trainees;
  }
}

