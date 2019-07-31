import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { TrainersService } from '../../Services/trainers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent implements OnInit, OnChanges {

  //Trainer passed from View Trainers Component.
  @Input() trainerToEdit : Trainer;

  @Output()
  refreshList = new EventEmitter<boolean>();
  //Used to store the original trainer fields.
  originalTrainer = new Trainer();

  constructor(private trService: TrainersService, private errorService: ErrorService) { }

  ngOnChanges(){
    if(this.trainerToEdit){
      this.displayTrainer(this.trainerToEdit);
    }
  }

  ngOnInit() 
  {

  }

  displayTrainer(trainer:Trainer)
  { //A setter method to set our initial Trainer information.
    //Display the information in the modal.
    this.originalTrainer = trainer; 

  }

  updateTrainerToEdit(){
        //Update the trainer
        this.trainerToEdit = this.originalTrainer;
        console.log("Updating trainer");
        this.trService.editTrainer(this.trainerToEdit).subscribe(trainer => {
          console.log("Hello");
          console.log(trainer);
          if (trainer) {
            const elem = document.getElementById('closeButtonUpdate');
            const evt = new MouseEvent('click', { bubbles: true });
            elem.dispatchEvent(evt);
            this.refreshList.emit(true);
          }
        },
        issue => {
          if (issue instanceof HttpErrorResponse) {
            const serviceName = 'User Service ';
            const errorMessage = 'Failed to make connection!';
            this.errorService.setError(serviceName, errorMessage);
          }
        
      });
  }

  closeTrainer(){
    //This function should close the modal, and omit any changes made in the modal.
    //I.e. The trainer information should remain unchanged.
    this.trainerToEdit = this.originalTrainer;
    this.refreshList.emit(true);
  }

  getTrainerToEdit(trainer:Trainer)
  {
    return this.trainerToEdit;

  }

}
