import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ReportsContainerComponent} from "./components/reports-container/reports-container.component";

const routes: Routes = [
  {
    path: '',
    component: ReportsContainerComponent
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
export class ReportsV2RoutingModule {}
