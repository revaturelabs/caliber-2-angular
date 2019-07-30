import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../types/trainer';

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent implements OnInit {

  constructor() { }

  trainerToEdit : Trainer;

  ngOnInit() 
  {

  }

  updateTrainerToEdit(trainer:Trainer)
  {
    this.trainerToEdit = trainer;
  }

  getTrainerToEdit(trainer:Trainer)
  {
    return this.trainerToEdit;

  }

}
