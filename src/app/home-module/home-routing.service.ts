import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule( {
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {}
