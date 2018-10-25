import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewtrainees',
  templateUrl: './viewtrainees.component.html',
  styleUrls: ['./viewtrainees.component.css']
})
export class ViewtraineesComponent implements OnInit {

  showdropped = true;

  constructor() { }

  ngOnInit() {
  }

  switchTraineeView() {
    const temp = !this.showdropped;
    this.showdropped = temp;
  }

}
