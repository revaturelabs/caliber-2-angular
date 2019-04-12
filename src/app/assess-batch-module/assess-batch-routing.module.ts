import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AssessBatchComponent } from "../Assess-Batch/Components/assess-batch/assess-batch.component";

const routes: Routes = [{ path: "", component: AssessBatchComponent }];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), CommonModule]
})
export class AssessBatchRoutingModule {}
