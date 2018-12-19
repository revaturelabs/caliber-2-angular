import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AuditComponent } from '../Audit/Components/audit/audit.component';

const routes: Routes = [
  { path: '', component: AuditComponent}
];

@NgModule( {
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AuditRoutingModule {}
