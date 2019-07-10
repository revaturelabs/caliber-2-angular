import { NgModule } from '@angular/core';
import { BatchRoutingModule } from './batch-routing.service';
import { BatchModule } from '../Batch/batch/batch.module';


/**
 * This exports the batch routing module.
 *
 */
@NgModule({
  imports: [
    BatchRoutingModule,
    BatchModule
  ],
})

export class BatchRouteModule { }
