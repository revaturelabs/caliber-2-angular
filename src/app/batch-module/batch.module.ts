import { NgModule } from '@angular/core';
import { BatchRoutingModule } from './batch-routing.service';
import { BatchViewComponent } from '../Team2/batch-view/batch-view.component';
import { BatchModule } from '../Team2/batch/batch.module';


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
