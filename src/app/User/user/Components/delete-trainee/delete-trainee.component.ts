import { Component, OnInit } from '@angular/core';
import { TraineesService } from '../../Services/trainees.service';
import { Trainee } from '../../types/trainee';

@Component({
  selector: 'app-delete-trainee',
  templateUrl: './delete-trainee.component.html',
  styleUrls: ['./delete-trainee.component.css']
})
export class DeleteTraineeComponent implements OnInit {

  private trainee: Trainee;

  private deleteTrainee(trainee: Trainee) {
    this.ts.deleteTrainee(trainee.traineeId).subscribe();
  }

  constructor(private ts: TraineesService) { }

  ngOnInit() {
  }

}
