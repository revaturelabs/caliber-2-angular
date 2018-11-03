import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['../batch-view/batch-view.component.css']
})
export class SelectYearComponent implements OnInit {
  defaultYears = [2016, 2017, 2018, 2019];
  selectedYear = 2016;

  constructor(private batchService: BatchService) { }

  ngOnInit() {
  }
  pickYear(event: number) {
     this.selectedYear =  event;
     // this.batchService
  }

}
