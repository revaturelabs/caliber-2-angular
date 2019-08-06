import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrainersService } from '../../Services/trainers.service';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { EditTrainerComponent } from '../edit-trainer/edit-trainer.component';
import { AddTrainerComponent } from '../add-trainer/add-trainer.component';

@Component({
  selector: 'app-view-trainers',
  templateUrl: './view-trainers.component.html',
  styleUrls: ['./view-trainers.component.css']
})
export class ViewTrainersComponent implements OnInit {

  constructor(private trainerservice : TrainersService,
    private errorService: ErrorService) { }

  trainersList : Trainer[] = [];
  
  @ViewChildren('addTrainerModal') AddTrainer: AddTrainerComponent;

  @ViewChild('editTrainerModal') EditTrainer: EditTrainerComponent;

  ngOnInit() 
  {
    this.getAllTrainers();
  }

  /**     This method redirects to the EditTrainerComponent
   * to display the trainer's information in the modal which is
   * specified in the *ngFor loop..
   * @author Carl Pacquing 
   */
  displayTrainerUpdateModal(trainer:Trainer)
  {
    this.EditTrainer.displayTrainer(trainer);

  }

  getAllTrainers() 
  {
    this.trainerservice.getAllTrainers().subscribe(trainer => 
      {
        trainer.forEach(trainer => {
          this.trainersList.push(trainer);
        });
      }, error => {
        const serviceName = 'User Service ';
        const errorMessage = 'Failed to make connection!';
        this.errorService.setError(serviceName, errorMessage);
      });

  }

  resetAddTrainerForm()
  {
    this.AddTrainer.resetAddTrainerForm();
  }

}
