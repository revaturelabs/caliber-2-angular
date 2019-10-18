import {Pipe, PipeTransform} from "@angular/core";
import {Batch} from "../../domain/model/batch.dto";
import {Trainee} from "../../domain/model/trainee.dto";

@Pipe({
  name: "switchBatch"
})
export class SwitchBatchPipe implements PipeTransform {

  /*
   * Hide trainee's current batch when attempting to switch
   */

  transform(batches: Batch[], trainee: Trainee): Batch[] | undefined {
    if (batches && batches.length > 0) {
      if (trainee) {
        return batches.filter(batch => batch.batchId !== trainee.batchId);
      }
      return batches;
    }
    return undefined;
  }

}
