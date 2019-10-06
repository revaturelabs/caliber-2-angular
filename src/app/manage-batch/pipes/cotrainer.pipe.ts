import {Pipe, PipeTransform} from "@angular/core";
import {Trainer} from "../../domain/model/trainer.dto";

@Pipe({
  name: 'coTrainer'
})
export class CoTrainerPipe implements PipeTransform {

  /**
   * Removed the lead trainer from the coTrainer dropdown so that we do not end up with the same
   * trainer as co-trainer
   *
   * @param trainers
   * @param leadTrainer
   */

  transform(trainers: Trainer[], leadTrainer: string): Trainer[] {
    if (trainers && trainers.length && leadTrainer) {
      return trainers.filter(trainer => trainer.name !== leadTrainer);
    }
    return trainers;
  }

}
