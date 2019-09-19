import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QualityAuditContainerComponent} from "./components/quality-audit-container/quality-audit-container.component";

const routes: Routes = [
  {
    path: '',
    component: QualityAuditContainerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QualityAuditRoutingModule {}
