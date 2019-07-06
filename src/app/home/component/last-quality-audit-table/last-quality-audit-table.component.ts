import { Component, OnInit } from '@angular/core';
import { Batch } from '../../models/batch';
import { LastQualityAuditService } from '../../services/last-quality-audit.service';

@Component({
  selector: 'app-last-quality-audit-table',
  templateUrl: './last-quality-audit-table.component.html',
  styleUrls: ['./last-quality-audit-table.component.css']
})
export class LastQualityAuditTableComponent implements OnInit {
  statuses: string[];
  batches: Batch[];
  constructor(private lastQualityAudit: LastQualityAuditService) {
    this.statuses = ['Poor', 'Average', 'Good', 'Superstar', 'Overall Batch Status'];
    this.lastQualityAudit.getBatches().subscribe(data => {
      this.batches = data;
    });
   }

  ngOnInit() {
  }

}
