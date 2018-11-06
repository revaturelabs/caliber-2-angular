import { NgModule } from '@angular/core';
// import { BatchViewComponent } from '../Team2/batch-view/batch-view.component';
import { BatchRoutingModule } from './batch-routing.service';
import { BatchModule } from '../Team2/batch/batch.module';



@NgModule({
  imports: [
    BatchRoutingModule,
  ],
  declarations: [BatchModule],
})
export class BatchRouteModule { }
