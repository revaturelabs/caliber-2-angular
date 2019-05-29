import { Component, OnInit } from '@angular/core';
import { AuditService} from '../../Services/audit.service';
import { QcNote } from '../../types/note';
import { NoteService } from 'src/app/Assess-Batch/Services/note.service';
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  notes : QcNote[] = this.auditService.notes;
  constructor(public auditService:AuditService) { }

  ngOnInit() {
    this.auditService.invokeAssosciateFunction.subscribe(()=> {    
      this.notes = this.auditService.notes;    
    });
  }
  
  

}
