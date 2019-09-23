import { Component, OnInit, Input, EventEmitter, Output, OnChanges, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import {Trainer} from "../../../../domain/model/trainer.dto";
import {TrainerService} from "../../../../services/subvertical/user/trainer.service";

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})

export class EditTrainerComponent implements OnInit{

  //Trainer passed from View Trainers Component.
  @Input() trainer : Trainer;

  //Used to store the original trainer fields.
  originalTrainer = new Trainer();


   isEdited:boolean = false;

   @Output() edited: EventEmitter<string> = new EventEmitter<string>()
  constructor(private trService: TrainerService, private errorService: ErrorService) { }

  ngOnInit()
  {

  }
  /**
   *      This method displays the trainer information in the modal to be edited.
   * We store the trainerObj parameter into an originalTrainer variable, and set the "trainer" variable,
   * which is two-way bound in the edit-trainer view, to the trainerObj parameter.
   * In order to remove two-way data-binding referencing, we converted "trainer" into a JSON.
   * Thus, we are able to distinguish between the original trainer, and the new trainer object.
   * @author Carl Pacquing
  */
  displayTrainer(trainerObj:Trainer)
  { //A setter method to set our initial Trainer information.
    //Display the information in the modal.
    console.log(trainerObj);
    this.originalTrainer = trainerObj;//Store original trainer to the trainerObj parameter.
    this.trainer = JSON.parse(JSON.stringify(trainerObj)); // actual trainer data;
    console.log(this.originalTrainer);
  }

/**Updates the trainer's information when the "Update" button is clicked.
 * When a valid request is sent, the trainer's information gets updated,
 * and the page reloads to display the changes.
 * @author Carl Pacquing
 */

  updateTrainerToEdit(){
        //Update the trainer
       // this.trainerToEdit = this.originalTrainer;
        console.log("Updating trainer");
        console.log("Original trainer: ", this.originalTrainer);
        console.log("New Trainer: ", this.trainer);

        this.trService.editTrainer(this.trainer).subscribe(response => {
          //window.location.reload() will break the concept of a
          //single-page application.
          //FIND AN ALTERNATIVE!
          //window.location.reload();

          this.edited.emit('Trainer is Updated');
        },
        issue => {
          console.log("Issue", issue);
          if (issue instanceof HttpErrorResponse) {
            const serviceName = 'User Service';
            this.errorService.setError(serviceName, issue.error.message);
          }
      });
  }

  returnNewTrainer():Trainer{
    console.log("Sending New Trainer Info.");
    return this.trainer;
  }


  closeTrainer(){
    //This function should close the modal, and omit any changes made in the modal.
    //I.e. The trainer information should remain unchanged.
    console.log("Revert to original fields.");
    console.log("Original Trainer:",this.originalTrainer);
    console.log("Before Cancellation:", this.trainer);
    this.trainer = this.originalTrainer;
    console.log("After Revert:", this.trainer);
  }
}




