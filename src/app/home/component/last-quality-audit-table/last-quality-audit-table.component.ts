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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    this.statuses = ['Poor', 'Average', 'Good', 'Superstar', 'Overall Batch Status'];
>>>>>>> parent of 23fa929... fiixed bug on the overall qc table so it now accounts for missing data
=======
    this.statuses = ['Poor', 'Average', 'Good', 'Superstar', 'Overall Batch Status'];
>>>>>>> parent of 23fa929... fiixed bug on the overall qc table so it now accounts for missing data
   }

  ngOnInit() {
  }

}
