import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TraineesService } from '../../Services/trainees.service';
import { Trainee } from '../../Types/trainee';

@Component({
  selector: 'app-delete-trainee',
  templateUrl: './delete-trainee.component.html',
  styleUrls: ['./delete-trainee.component.css']
})
export class DeleteTraineeComponent implements OnInit {

  /**
   * expects a 'trainee' as an input
   */
  @Input()
  private trainee: Trainee;

  /**
   * expects to output an 'EventEmitter<boolean>'
   */
  @Output()
  refreshList = new EventEmitter<boolean>();

  /**
   * calls the 'deleteTrainee' function from 'TraineeService' to delete the trainee
   * @param trainee the trainee that is to be deleted
   */
  private deleteTrainee(trainee: Trainee) {
    this.ts.deleteTrainee(trainee.traineeId).subscribe(data => {
      this.refreshList.emit(true);
    });
  }

  /**
   * @ignore
   */
  constructor(private ts: TraineesService) { }

  /**
   * @ignore
   */
  ngOnInit() {
    this.trainee = new Trainee();
    this.trainee.name = '';
  }

}
