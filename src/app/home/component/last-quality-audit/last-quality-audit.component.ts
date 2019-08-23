import { Component, OnInit, ViewChild } from '@angular/core';
import { LastQualityAuditTableComponent } from '../last-quality-audit-table/last-quality-audit-table.component';
import { LastQualityAuditGraphComponent } from '../last-quality-audit-graph/last-quality-audit-graph.component';
import { BatchCollection } from '../../models/batchcollection';
import { Batch } from 'src/app/Batch/type/batch';
import { BatchService } from 'src/app/Batch/batch.service';
import { QanoteService } from '../../service/qanote.service';
import { QANote } from 'src/app/reports/Models/qanote';

@Component({
  selector: 'app-last-quality-audit',
  templateUrl: './last-quality-audit.component.html',
  styleUrls: ['./last-quality-audit.component.css']
})
export class LastQualityAuditComponent implements OnInit {

  overallBatchCollection: BatchCollection[];
  filteredBatchCollection: BatchCollection[];

  stateCity: String[];
  @ViewChild(LastQualityAuditTableComponent) lastQualityAuditTable: LastQualityAuditTableComponent;
  @ViewChild(LastQualityAuditGraphComponent) lastQualityAuditGraph: LastQualityAuditGraphComponent;
  constructor(
    private batchService: BatchService,
    private qaService: QanoteService
  ) { }

  ngOnInit() 
  {
    this.initializeBatchCollection();  
    this.assignInternalNumbers();
    
  }
  
  initializeBatchCollection()
  {
    this.overallBatchCollection = [];
    let batches: Batch[];
    this.batchService.getBatches().subscribe(data => {
      batches = data;
      for (let i = 0; i < data.length; i++) {
        let tempBatch:BatchCollection={batch:batches[i]};
        this.overallBatchCollection.push(tempBatch);
      }
  
      for (let i = 0; i < this.overallBatchCollection.length; i++) {
        this.qaService.getAllQANotes(this.overallBatchCollection[i].batch).subscribe(input =>{ this.overallBatchCollection[i].qaNotes = input;
        });
      }
    });

  }

  assignInternalNumbers()
  {
    //this.overallBatchCollection.forEach()
  }

  updateHomeOutput(num: number) {
    this.lastQualityAuditTable.update();
    this.lastQualityAuditGraph.update();
  }

}
