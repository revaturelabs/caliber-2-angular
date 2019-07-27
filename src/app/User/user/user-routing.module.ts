import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewTrainersComponent } from './Components/view-trainers/view-trainers.component';

const routes: Routes = [
  { path: '', component: ViewTrainersComponent}
];

@NgModule( {
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes),CommonModule],
})
export class UserRoutingModule {}
