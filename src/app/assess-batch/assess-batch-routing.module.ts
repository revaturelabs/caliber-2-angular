import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AssessBatchConatinerComponent } from "./components/assess-batch-conatiner/assess-batch-conatiner.component";

const routes: Routes = [
  {
    path: '',
    component: AssessBatchConatinerComponent,
    data: { animation: "AssessBatchPage" }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessBatchRoutingModule {}
