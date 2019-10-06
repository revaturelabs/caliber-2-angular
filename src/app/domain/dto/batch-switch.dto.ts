import {Trainee} from "../model/trainee.dto";

export interface BatchSwitchDto {
  oldBatch: number;
  updatedTrainee: Trainee;
}
