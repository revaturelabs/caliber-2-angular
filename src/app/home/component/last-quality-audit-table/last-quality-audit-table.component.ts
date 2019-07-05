import { Component, OnInit } from '@angular/core';
import { Batch } from '../../models/batch';

@Component({
  selector: 'app-last-quality-audit-table',
  templateUrl: './last-quality-audit-table.component.html',
  styleUrls: ['./last-quality-audit-table.component.css']
})
export class LastQualityAuditTableComponent implements OnInit {
  statuses: string[];
  batches: Batch[];
  constructor() {
    this.statuses = ['Poor', 'Average', 'Good', 'Superstar', 'Overall Batch Status'];
   }

  ngOnInit() {
  }

}
