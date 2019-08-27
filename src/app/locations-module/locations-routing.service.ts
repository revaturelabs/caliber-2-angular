import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LocationspageComponent } from '../locationspage/locationspage.component';

const routes: Routes = [
  {path:'', component: LocationspageComponent}
];

@NgModule( {
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})

export class LocationsRoutingService { }