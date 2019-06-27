import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../Services/report.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  years: number[];
  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

  displayYears(){
    this.reportService.getAllYears().subscribe(result => {
      this.years = result;
    });
  }
}
