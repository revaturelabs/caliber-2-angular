import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { TrainersService } from '../../Services/trainers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-disable-trainer',
  templateUrl: './disable-trainer.component.html',
  styleUrls: ['./disable-trainer.component.css']
})
export class DisableTrainerComponent implements OnInit {

  // Trainer passed from View Trainers Component.
  @Input() trainerToEdit: Trainer;

  @Output() edited: EventEmitter<String> = new EventEmitter;

  // Used to store the original trainer fields.
  originalTrainer = new Trainer();
  // Used to store the new trainer inputs.
  trainer: Trainer;

  constructor(private trainerService: TrainersService, private errorService: ErrorService) { }

  ngOnInit() {
  }

  displayConfirmation(trainer: Trainer) {
    this.originalTrainer = trainer;
    this.trainer = JSON.parse(JSON.stringify(trainer));
    console.log(this.originalTrainer);
  }

  disableTrainer() {
    this.trainerService.disableTrainer(this.originalTrainer).subscribe(trainer => {
      console.log('Disabling Trainer: ' + this.originalTrainer);
      this.edited.emit('Trainer Updated');
    }, error => {
      const serviceName = 'User Service';
      const errorMessage = 'Failed to make connection!';
      this.errorService.setError(serviceName, errorMessage);
    });
  }

  closeModal() {
    this.trainer = this.originalTrainer;
  }

  getTrainer(trainer: Trainer) {
    return trainer;
  }

}
