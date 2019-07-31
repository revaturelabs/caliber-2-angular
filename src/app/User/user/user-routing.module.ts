import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewTrainersComponent } from './Components/view-trainers/view-trainers.component';
import { EditTrainerComponent } from './Components/edit-trainer/edit-trainer.component';

const routes: Routes = [
  { path: 'viewTrainers', component: ViewTrainersComponent}
];

@NgModule( {
  exports: [RouterModule],
  declarations: [
  ],
  imports: [RouterModule.forChild(routes)],
})
export class UserRoutingModule {}
