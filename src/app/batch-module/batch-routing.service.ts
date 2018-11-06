import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { BatchModule } from '../Team2/batch/batch.module';
import { BatchViewComponent } from '../Team2/batch-view/batch-view.component';

/**
 * This class is handles routing to the batch module, which contains the batch view
 *
 */

/**
 * This is the routes to exportwith our module
 */
const routes: Routes = [
  { path: '', component: BatchViewComponent }
];

/**
 * the module itself
 */
@NgModule( {
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
  entryComponents: [BatchViewComponent]
})
export class BatchRoutingModule {}
