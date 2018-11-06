import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: '', redirectTo: '#/vp/home', pathMatch: 'full' },
  { path: '#/vp/home', component: HomeComponent },
  { path: '#/vp/manage', component: ManageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
