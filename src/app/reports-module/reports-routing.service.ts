import { ReportsComponent } from './../reports/Components/reports/reports.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  { path: '', component: ReportsComponent }
];

@NgModule( {
  exports: [RouterModule],
  declarations: [
  ],
  imports: [RouterModule.forChild(routes)],
})
export class ReportsRoutingModule{}
