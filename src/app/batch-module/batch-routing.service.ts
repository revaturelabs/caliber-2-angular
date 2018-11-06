import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { BatchModule } from '../Team2/batch/batch.module';

const routes: Routes = [
  { path: '', component: BatchModule }
];

@NgModule( {
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class BatchRoutingModule {}
