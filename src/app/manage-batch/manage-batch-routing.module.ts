import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ManageBatchContainerComponent} from "./components/manage-batch-container/manage-batch-container.component";

const routes: Routes = [
  {
    path: '',
    component: ManageBatchContainerComponent,
    data: { animation: "ManageBatchPage" }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ManageBatchRoutingModule {}
