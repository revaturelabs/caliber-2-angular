import { Component, OnInit, Input, OnChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { Trainee } from '../../Types/trainee';
import { TraineesService } from '../../Services/trainees.service';

/**
  * UpdateTrainee Component to update a trainee information using a modal.
  */
@Component({
  selector: 'app-update-trainee',
  templateUrl: './update-trainee.component.html',
  styleUrls: ['./update-trainee.component.css']
})
export class UpdateTraineeComponent implements OnInit, OnChanges {

  /**
  * Trainee object were passing from view-trainees component.
  * Specifically passes the trainee object we want to update, depending
  * on what row the update button was pressed.
  * @author Jacques Myette
  */
  @Input()
  private trainee: Trainee;

  /**
  * Calls another get request to populate the trainees after we update a trainee.
  * Passed as output to get back to our view-trainees component.
  * @author Jacques Myette
  */
  @Output()
  refreshList = new EventEmitter<boolean>();

  /**
  * Use a Temp Trainee to two-way bind with our update form in our modal, so when
  * the fields are changed but not updated, they're reverted to their original values.
  * @author Jacques Myette
  */
  private traineeTemp = new Trainee();

  /**
  * Inject our TraineeService to call our UpdateTrainee (put) method
  * @author Jacques Myette
  */
  constructor(private ts: TraineesService) { }

  /**
   * Called when @input changes
   */
  ngOnChanges() {
    this.refreshTrainee();
  }

   /**
   * Called when component is loaded
   */
  ngOnInit() {
    this.trainee = new Trainee();
    this.trainee.email = '';
  }


  /**
   * Called when 'Close' button is clicked in our update modal.
   * Sets temp Trainee back to original Trainee so values aren't saved in the update form.
   * Refreshes view-all trainee using another get request.
   * @author Jacques Myette
   */
  close() {
    // console.log('in close() setting ' + this.trainee.email + ' to ' + this.traineeTemp.email);
    this.traineeTemp = this.trainee;
    this.refreshList.emit(true);
  }

  /**
   * Called in ngOnChanges()
   * Sets our temp Trainee fields to the Trainee we are passing as Input to the component
   * @author Jacques Myette
   */
  refreshTrainee() {
    if (this.trainee) {
      this.traineeTemp.college = this.trainee.college;
      this.traineeTemp.degree = this.trainee.degree;
      this.traineeTemp.email = this.trainee.email;
      this.traineeTemp.major = this.trainee.major;
      this.traineeTemp.name = this.trainee.name;
      this.traineeTemp.phoneNumber = this.trainee.phoneNumber;
      this.traineeTemp.profileUrl = this.trainee.profileUrl;
      this.traineeTemp.projectCompletion = this.trainee.projectCompletion;
      this.traineeTemp.recruiterName = this.trainee.recruiterName;
      this.traineeTemp.techScreenerName = this.trainee.techScreenerName;
      this.traineeTemp.skypeId = this.trainee.skypeId;
      this.traineeTemp.trainingStatus = this.trainee.trainingStatus;
    }
  }

   /**
   * Called in updateTrainee().
   * Sets our Trainee fields to the temp Trainee we have updated in our Update modal.
   * Had to update every field because doing 'this.trainee = this.tempTrainee;' wasn't working as expected.
   * @author Jacques Myette
   */
  mergeTrainee() {
    this.trainee.college = this.traineeTemp.college;
    this.trainee.degree = this.traineeTemp.degree;
    this.trainee.email = this.traineeTemp.email;
    this.trainee.major = this.traineeTemp.major;
    this.trainee.name = this.traineeTemp.name;
    this.trainee.phoneNumber = this.traineeTemp.phoneNumber;
    this.trainee.profileUrl = this.traineeTemp.profileUrl;
    this.trainee.projectCompletion = this.traineeTemp.projectCompletion;
    this.trainee.recruiterName = this.traineeTemp.recruiterName;
    this.trainee.techScreenerName = this.traineeTemp.techScreenerName;
    this.trainee.skypeId = this.traineeTemp.skypeId;
    this.trainee.trainingStatus = this.traineeTemp.trainingStatus;
  }

  /**
   * Called when 'Update' button is called in our Update Modal
   * First merges the temp Trainee which is two-way bound in our Update Modal, to our actual trainee object
   * Mocks a click event to the 'Close' button id to close the modal when we want to update a trainee
   * @author Jacques Myette
   */
  updateTrainee() {
    this.mergeTrainee();
    this.ts.updateTrainee(this.trainee).subscribe(data => {
      if (data) {
        const elem = document.getElementById('closeButtonUpdate');
        const evt = new MouseEvent('click', { bubbles: true });
        elem.dispatchEvent(evt);
        this.refreshList.emit(true);
      }
    });
  }

}
