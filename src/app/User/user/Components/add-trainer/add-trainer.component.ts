import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { TrainersService } from '../../Services/trainers.service';
import { ErrorService } from 'src/app/error-handling/services/error.service';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {

  constructor(private trainerServ:TrainersService, private errorService:ErrorService) { }

  ngOnInit() {
  }

  private newTrainer:Trainer = new Trainer();

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
      //window.location.reload();
    }, error => {

      this.toggleFailureMsgDisplay();
      this.displayFailureMsg = "Failed to add trainer to database! Please fill out all fields correctly, and give a unique email.";
      //this.closeAddTrainerModal();
    });

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
