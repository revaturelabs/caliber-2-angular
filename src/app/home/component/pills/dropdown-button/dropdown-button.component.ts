import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.css']
})
export class DropdownButtonComponent implements OnInit {

  @Input()
  weekNumber: number;

  @Output()
  addWeek = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }

  addWeekPill() {
    this.addWeek.emit(this.weekNumber);
  }

}
