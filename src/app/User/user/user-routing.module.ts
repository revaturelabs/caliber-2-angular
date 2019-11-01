import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewTrainersComponent} from './Components/view-trainers/view-trainers.component';

const routes: Routes = [
  { path: 'viewTrainers', component: ViewTrainersComponent, data: { animation: 'ManageTrainersPage' }}
];

@NgModule( {
  exports: [RouterModule],
  declarations: [
  ],
  imports: [RouterModule.forChild(routes)],
})
export class UserRoutingModule {}
