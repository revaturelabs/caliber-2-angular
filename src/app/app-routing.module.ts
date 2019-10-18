import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'vp/home', pathMatch: 'full' },
  { path: 'vp/home', loadChildren: 'src/app/home-module/home-module.module#HomeModule' },
  { path: 'vp/manage', loadChildren: './manage-batch/manage-batch.module#ManageBatchModule' },
  { path: 'vp/audit', loadChildren: './quality-audit/quality-audit.module#QualityAuditModule'},
  { path: 'vp/assess', loadChildren: './assess-batch-v2/assess-batch-v2.module#AssessBatchV2Module'},
  { path: 'vp/reports', loadChildren: './reports-v2/reports-v2.module#ReportsV2Module'},
  { path: 'vp/trainers', loadChildren: './User/user/user.module#UserModule'},
  { path: 'vp/locations', loadChildren: './locations-module/locations-module.module#LocationsModule'},
  { path: 'vp/category', loadChildren: './assess-categories-module/assess-categories-module.module#AssessCategoriesModule'},
  { path: 'vp/panels', loadChildren: './reports-module/reports-module.module#ReportsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
