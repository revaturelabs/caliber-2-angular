import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrainersService } from '../../Services/trainers.service';
import { ErrorService } from 'src/app/error-handling/services/error.service';

@Component({
  selector: 'app-view-trainers',
  templateUrl: './view-trainers.component.html',
  styleUrls: ['./view-trainers.component.css']
})
export class ViewTrainersComponent implements OnInit {

  constructor(private trainerservice : TrainersService,
    private errorService: ErrorService) { }

  trainersList : Trainer[] = [];

  ngOnInit() {
    this.getAllTrainers();
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

}
