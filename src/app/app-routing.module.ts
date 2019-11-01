import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequiresAuthenticationGuard} from "./auth/guards/requires-authentication.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: 'src/app/home-module/home-module.module#HomeModule', canActivate: [RequiresAuthenticationGuard], },
  { path: 'manage', loadChildren: './manage-batch/manage-batch.module#ManageBatchModule', canActivate: [RequiresAuthenticationGuard], },
  { path: 'audit', loadChildren: './quality-audit/quality-audit.module#QualityAuditModule', canActivate: [RequiresAuthenticationGuard], },
  { path: 'assess', loadChildren: './assess-batch-v2/assess-batch-v2.module#AssessBatchV2Module', canActivate: [RequiresAuthenticationGuard], },
  { path: 'reports', loadChildren: './reports-v2/reports-v2.module#ReportsV2Module', canActivate: [RequiresAuthenticationGuard], },
  { path: 'trainers', loadChildren: './User/user/user.module#UserModule', canActivate: [RequiresAuthenticationGuard], },
  { path: 'locations', loadChildren: './locations-module/locations-module.module#LocationsModule', canActivate: [RequiresAuthenticationGuard], },
  { path: 'category', loadChildren: './assess-categories-module/assess-categories-module.module#AssessCategoriesModule', canActivate: [RequiresAuthenticationGuard], },
  { path: 'panels', loadChildren: './reports-module/reports-module.module#ReportsModule', canActivate: [RequiresAuthenticationGuard], },
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
