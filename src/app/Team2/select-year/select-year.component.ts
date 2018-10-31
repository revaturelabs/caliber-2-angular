import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['../batch-view/batch-view.component.css']
})
export class SelectYearComponent implements OnInit {
  defaultYears = [2016, 2017, 2018, 2019];
  selectedYear = 2016;
  constructor() { }

  ngOnInit() {
  }
  pickYear(event) {
     console.log ('working');
  }

}
