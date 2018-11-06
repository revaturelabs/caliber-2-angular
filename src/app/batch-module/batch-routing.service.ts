import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { BatchViewComponent } from '../Batch/batch-view/batch-view.component';

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
