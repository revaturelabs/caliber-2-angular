import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TraineesService } from '../../Services/trainees.service';
import { Trainee } from '../../Types/trainee';

@Component({
  selector: 'app-delete-trainee',
  templateUrl: './delete-trainee.component.html',
  styleUrls: ['./delete-trainee.component.css']
})
export class DeleteTraineeComponent implements OnInit {

  @Input()
  /**
   * trainee refers to the specific trainee object that is to be deleted
   */
  private trainee: Trainee;

  @Output()
  refreshList = new EventEmitter<boolean>();

  private deleteTrainee(trainee: Trainee) {
    this.ts.deleteTrainee(trainee.traineeId).subscribe(data => {
      this.refreshList.emit(true);
    });
  }

  constructor(private ts: TraineesService) { }

  ngOnInit() {
    this.trainee = new Trainee();
    this.trainee.name = '';
  }

}
