import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from 'src/app/reports/Service/report.service';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { QcNote } from 'src/app/Audit/types/note';

@Component({
  selector: 'app-individual-qcresults-row',
  templateUrl: './individual-qcresults-row.component.html',
  styleUrls: ['./individual-qcresults-row.component.css']
})
export class IndividualQcresultsRowComponent implements OnInit {
  @Input() public qcNote : QcNote;

  constructor() { }

  ngOnInit() {
  }

}
