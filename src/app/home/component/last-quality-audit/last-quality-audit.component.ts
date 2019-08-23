import { Component, OnInit, ViewChild } from '@angular/core';
import { LastQualityAuditTableComponent } from '../last-quality-audit-table/last-quality-audit-table.component';
import { LastQualityAuditGraphComponent } from '../last-quality-audit-graph/last-quality-audit-graph.component';
import { MissingGradesListComponent } from '../missing-grades-list/missing-grades-list.component';

@Component({
  selector: 'app-last-quality-audit',
  templateUrl: './last-quality-audit.component.html',
  styleUrls: ['./last-quality-audit.component.css']
})
export class LastQualityAuditComponent implements OnInit {
  stateCity: String[];
  @ViewChild(LastQualityAuditTableComponent) lastQualityAuditTable: LastQualityAuditTableComponent;
  @ViewChild(LastQualityAuditGraphComponent) lastQualityAuditGraph: LastQualityAuditGraphComponent;
  @ViewChild(MissingGradesListComponent) missingGradeTable: MissingGradesListComponent;
  constructor() { }

  ngOnInit() {
  }

  updateHomeOutput(num: number) {
    this.lastQualityAuditTable.update();
    this.lastQualityAuditGraph.update();
    this.missingGradeTable.update();
  }

}
