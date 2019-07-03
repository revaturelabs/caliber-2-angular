import { Component, OnInit } from '@angular/core';
import { QcNote } from 'src/app/Audit/types/note';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { ReportService } from '../../Service/report.service';
import { Batch } from 'src/app/Batch/type/batch';

@Component({
  selector: 'app-individual-qcresults-table',
  templateUrl: './individual-qcresults-table.component.html',
  styleUrls: ['./individual-qcresults-table.component.css']
})
export class IndividualQCResultsTableComponent implements OnInit {

  public qcNotes : QcNote[];
  public week : number;
  public batch : Batch;
  public overallNote : QcNote;


  constructor(private auditService : AuditService, private reportService : ReportService) { }

  ngOnInit() {
    this.week = this.reportService.week;
    this.batch = this.reportService.batch;

    this.auditService.getNotesByBatchByWeek(this.week, this.batch.batchId).subscribe((notes)=>{
      this.qcNotes = notes;
    });
  }

}
