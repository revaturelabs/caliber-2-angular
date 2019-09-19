import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/component/home/home.component';
import { BatchViewComponent } from './Batch/batch-view/batch-view.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HomeModule } from './home-module/home-module.module';
import { LocationsModule } from './locations-module/locations-module.module';
import { AuditModule } from './audit-module/audit-module.module';
import { AssessBatchModule } from './assess-batch-module/assess-batch-module.module';
import { CategoriesComponent } from './AssessmentCategories/Components/categories/categories.component';



const routes: Routes = [
  { path: '', redirectTo: 'vp/home', pathMatch: 'full' },
  { path: 'vp/home', loadChildren: 'src/app/home-module/home-module.module#HomeModule' },
  { path: 'vp/manage', loadChildren: './batch-module/batch.module#BatchRouteModule' },
  { path: 'vp/audit', loadChildren: './quality-audit/quality-audit.module#QualityAuditModule'},
  { path: 'vp/assess', loadChildren: './assess-batch-v2/assess-batch-v2.module#AssessBatchV2Module'},
  { path: 'vp/reports', loadChildren: './reports-module/reports-module.module#ReportsModule'},
  { path: 'vp/trainers', loadChildren: './User/user/user.module#UserModule'},
  { path: 'vp/locations', loadChildren: './locations-module/locations-module.module#LocationsModule'},
  { path: 'vp/category', loadChildren: './assess-categories-module/assess-categories-module.module#AssessCategoriesModule'},
  { path: 'vp/panels', loadChildren: './audit-module/audit-module.module#AuditModule'}
  //{ path: 'vp/category', component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
