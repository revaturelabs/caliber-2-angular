import {Component, Input, OnInit} from '@angular/core';
import {Trainee} from "../../../Batch/type/trainee";

@Component({
  selector: 'app-associate-details',
  templateUrl: './associate-details.component.html',
  styleUrls: ['./associate-details.component.css']
})
export class AssociateDetailsComponent implements OnInit {

  @Input("trainee") trainee: Trainee;

  constructor() { }

  ngOnInit() {
  }

}
