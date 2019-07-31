import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { TrainersService } from '../../Services/trainers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent implements OnInit, OnChanges {

  //Trainer passed from View Trainers Component.
  @Input() trainerToEdit : Trainer;

  @Output() refreshList = new EventEmitter<boolean>();
  //Used to store the original trainer fields.
  originalTrainer = new Trainer();
  //Used to store the new trainer inputs.
  trainer:Trainer;

  constructor(private trService: TrainersService, private errorService: ErrorService, private router:Router ) { }

  ngOnChanges(){
    console.log("Something changed.");
  }

  ngOnInit() 
  {
    
  }

  displayTrainer(trainerObj:Trainer)
  { //A setter method to set our initial Trainer information.
    //Display the information in the modal.
    console.log(trainerObj);
    //console.log(this.originalTrainer);
    this.originalTrainer = trainerObj;//Store original trainer to the trainerObj parameter.    
    this.trainer = JSON.parse(JSON.stringify(trainerObj)); // actual trainer data;
    console.log(this.originalTrainer);
  }


  updateTrainerToEdit(){
        //Update the trainer
       // this.trainerToEdit = this.originalTrainer;
        console.log("Updating trainer");
        console.log("Original trainer: ", this.originalTrainer);
        console.log("New Trainer: ", this.trainer);
        this.trService.editTrainer(this.trainer).subscribe(response => {
          console.log("Hello");
          //this.originalTrainer= this.trainer;
          //console.log("After Update: ", this.originalTrainer);
          this.router.navigateByUrl("vp/trainers");
        },
        issue => {
          if (issue instanceof HttpErrorResponse) {
            const serviceName = 'User Service ';
            const errorMessage = 'Failed to make connection!';
            this.errorService.setError(serviceName, errorMessage);
          }
        
      });
  }

  closeTrainer(form:NgForm){
    form.reset();
    //This function should close the modal, and omit any changes made in the modal.
    //I.e. The trainer information should remain unchanged.
    console.log("Revert to original fields.");
    console.log("Original Trainer:",this.originalTrainer);
    console.log("TrainerToEdit:", this.trainer);
    this.trainer = this.originalTrainer;
    console.log("After Revert:", this.trainer);
    //this.router.navigate(['vp/trainers']);
    //this.refreshList.emit(true);
  }

  getTrainerToEdit(trainer:Trainer)
  {
    return this.trainerToEdit;

  }

}
