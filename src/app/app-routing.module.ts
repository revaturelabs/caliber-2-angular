import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'vp/home', pathMatch: 'full' },
  { path: 'vp/home', loadChildren: 'src/app/home-module/home-module.module#HomeModule', data: { animation: 'HomePage' } },
  { path: 'vp/manage', loadChildren: './manage-batch/manage-batch.module#ManageBatchModule', data: { animation: "ManageBatchPage" } },
  { path: 'vp/audit', loadChildren: './quality-audit/quality-audit.module#QualityAuditModule', data: { animation: "QualityAuditPage" }},
  { path: 'vp/assess', loadChildren: './assess-batch-v2/assess-batch-v2.module#AssessBatchV2Module', data: { animation: "AssessBatchPage" }},
  { path: 'vp/reports', loadChildren: './reports-v2/reports-v2.module#ReportsV2Module', data: { animation: "ReportsPage" }},
  { path: 'vp/trainers', loadChildren: './User/user/user.module#UserModule', data: { animation: "ManageTrainersPage" }},
  { path: 'vp/locations', loadChildren: './locations-module/locations-module.module#LocationsModule', data: { animation: "LocationsPage" }},
  { path: 'vp/category', loadChildren: './assess-categories-module/assess-categories-module.module#AssessCategoriesModule', data: { animation: "CategoriesPage" }},

  // Used to compare module currently working on
  // { path: 'vp/panels', loadChildren: './reports-module/reports-module.module#ReportsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
