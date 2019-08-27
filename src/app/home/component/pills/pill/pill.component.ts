import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.css']
})
export class PillComponent implements OnInit {
  
  @Input()
  weekNumber: number;

  @Output()
  removeWeek = new EventEmitter<number>();

  hover:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  removeWeekPill() {
    this.removeWeek.emit(this.weekNumber);
  }
}
