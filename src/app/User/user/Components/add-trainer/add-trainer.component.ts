import { Component, OnInit, Host, Output, EventEmitter } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { TrainersService } from '../../Services/trainers.service';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { ViewTrainersComponent } from '../view-trainers/view-trainers.component';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {

  @Output() submittedTrainerEvent: EventEmitter<String> = new EventEmitter<String>();

  constructor( private trainerServ:TrainersService, private errorService:ErrorService) { }

  ngOnInit() {
  }

  newTrainer:Trainer = new Trainer();

  displaySuccess:boolean;

  displayFailure:boolean;

  displaySuccessMsg:String;

  displayFailureMsg:String;
  
  addTrainer()
  {
    this.trainerServ.addTrainer(this.newTrainer).subscribe(response => 
    {
      this.toggleSuccessMsgDisplay();
      this.displaySuccessMsg = "Trainer added successfully!";
      this.submittedTrainerEvent.emit("Trainer added");
      //window.location.reload();
    }, error => {
      this.toggleFailureMsgDisplay();
      this.displayFailureMsg = "Failed to add trainer to database! Please fill out all fields correctly, and give a unique email.";
      //this.closeAddTrainerModal();
    });

  }

  getNewTrainer()
  {
    return this.newTrainer;
  }

  toggleSuccessMsgDisplay()
  {
    this.displayFailure = false;
    this.displaySuccess = true;
  }

  toggleFailureMsgDisplay() 
  {
    this.displaySuccess = false;
    this.displayFailure = true;
  }

  closeAddTrainerModal()
  {
    this.resetAddTrainerForm();
  }

  resetAddTrainerForm() 
  {
    console.log(this.newTrainer);
    if (this.newTrainer === undefined)
    {
      return;
    }
      
    this.newTrainer.trainerId = undefined;
    this.newTrainer.name = "";
    this.newTrainer.title = "";
    this.newTrainer.email = "";
    this.newTrainer.tier = "";
    this.newTrainer.password = "";

    this.displayFailure = false;
    this.displaySuccess = false;

    this.displayFailureMsg = "";
    this.displaySuccessMsg = "";

  }
  
}
