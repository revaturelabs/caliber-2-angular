import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequiresAuthenticationGuard} from "./auth/guards/requires-authentication.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: 'src/app/home-module/home-module.module#HomeModule', canActivate: [RequiresAuthenticationGuard], data: { animation: 'HomePage' }},
  { path: 'manage', loadChildren: './manage-batch/manage-batch.module#ManageBatchModule', canActivate: [RequiresAuthenticationGuard], data: { animation: "ManageBatchPage" } },
  { path: 'audit', loadChildren: './quality-audit/quality-audit.module#QualityAuditModule', canActivate: [RequiresAuthenticationGuard], data: { animation: "QualityAuditPage" }},
  { path: 'assess', loadChildren: './assess-batch-v2/assess-batch-v2.module#AssessBatchV2Module', canActivate: [RequiresAuthenticationGuard], data: { animation: "AssessBatchPage" }},
  { path: 'reports', loadChildren: './reports-v2/reports-v2.module#ReportsV2Module', canActivate: [RequiresAuthenticationGuard],  data: { animation: "ReportsPage" } },
  { path: 'trainers', loadChildren: './User/user/user.module#UserModule', canActivate: [RequiresAuthenticationGuard], data: { animation: "ManageTrainersPage" } },
  { path: 'locations', loadChildren: './locations-module/locations-module.module#LocationsModule', canActivate: [RequiresAuthenticationGuard], data: { animation: "LocationsPage" }},
  { path: 'category', loadChildren: './assess-categories-module/assess-categories-module.module#AssessCategoriesModule', canActivate: [RequiresAuthenticationGuard], data: { animation: "CategoriesPage" }},
  {
    path: 'error',
    loadChildren: './auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
