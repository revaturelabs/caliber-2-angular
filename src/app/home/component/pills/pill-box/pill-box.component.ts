import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pill-box',
  templateUrl: './pill-box.component.html',
  styleUrls: ['./pill-box.component.css']
})
export class PillBoxComponent implements OnInit {

  @Input()
  lastWeek: number;

  @Output()
  weekFilterChange = new EventEmitter<Array<number>>();

  weeksList: Array<number>;
  displayedWeeks: Array<number>;

  constructor() { }

  ngOnInit() {
    this.weeksList = new Array<number>();
    this.displayedWeeks = new Array<number>();

    for(let i: number = 1; i <= this.lastWeek; i++)
    {
      this.displayedWeeks.push(i);
    }
    this.weekFilterChange.emit(this.displayedWeeks);
  }

  addPill(weekNum: number) {
    let indexNum: number = this.weeksList.indexOf(weekNum);
    if(indexNum !== -1) {
      this.displayedWeeks.push(this.weeksList.splice(indexNum, 1)[0]);
      this.displayedWeeks.sort();
      this.weeksList.sort();
      this.weekFilterChange.emit(this.displayedWeeks);
    }
  }

  removePill(weekNum: number) {
    let indexNum: number = this.displayedWeeks.indexOf(weekNum);
    if(indexNum !== -1) {
      this.weeksList.push(this.displayedWeeks.splice(indexNum, 1)[0]);
      this.displayedWeeks.sort();
      this.weeksList.sort();
      this.weekFilterChange.emit(this.displayedWeeks);
    }
  }
}
