import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BatchViewComponent } from './Team2/batch-view/batch-view.component';



const routes: Routes = [
  { path: '', redirectTo: '#/vp/home', pathMatch: 'full' },
  { path: '#/vp/home', component: HomeComponent },
  { path: '#/vp/manage', component: BatchViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
