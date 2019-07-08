import { Component, OnInit, ViewChild } from '@angular/core';
import { LastQualityAuditTableComponent } from '../last-quality-audit-table/last-quality-audit-table.component';
import { LastQualityAuditGraphComponent } from '../last-quality-audit-graph/last-quality-audit-graph.component';

@Component({
  selector: 'app-last-quality-audit',
  templateUrl: './last-quality-audit.component.html',
  styleUrls: ['./last-quality-audit.component.css']
})
export class LastQualityAuditComponent implements OnInit {
  stateCity: String[];
  @ViewChild(LastQualityAuditTableComponent) lastQualityAuditTable: LastQualityAuditTableComponent;
  @ViewChild(LastQualityAuditGraphComponent) lastQualityAuditGraph: LastQualityAuditGraphComponent;
  constructor() { }

  ngOnInit() {
  }

  updateHomeOutput(num: number) {
    this.lastQualityAuditTable.update();
    this.lastQualityAuditGraph.update();
  }

}
