import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/component/home/home.component';
import { BatchViewComponent } from './Batch/batch-view/batch-view.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HomeModule } from './home-module/home-module.module';
import { AuditModule } from './audit-module/audit-module.module';
import { AssessBatchModule } from './assess-batch-module/assess-batch-module.module';



const routes: Routes = [ 
  { path: '', redirectTo: 'vp/home', pathMatch: 'full' },
  { path: 'vp/home', loadChildren: './home-module/home-module.module#HomeModule' },
  { path: 'vp/manage', loadChildren: './batch-module/batch.module#BatchRouteModule' },
  { path: 'vp/audit', loadChildren: './audit-module/audit-module.module#AuditModule'},
  { path: 'vp/assess', loadChildren: './assess-batch-module/assess-batch-module.module#AssessBatchModule'},
  { path: 'vp/reports', loadChildren: './reports-module/reports-module.module#ReportsModule'},
  {path: 'vp/category', loadChildren: './assess-categories-module/assess-categories-module.module#AssessCategoriesModule' }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
