import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { AuditService } from '../../Services/audit.service';
import { QcNote } from '../../types/note';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit, OnDestroy {
	overallQcStatus: String;
	noteContent: String;
	batchId: number;
	week: number;
	note: QcNote;
	noteSubscription: Subscription;
	//Smiley face status
	smile: string; meh: string; frown: string;

	constructor(private auditService: AuditService) { }

	ngOnInit() {
		this.noteSubscription = this.auditService.overallBatchNoteChanged.subscribe(data => {
			this.note = data;	
		});
		
		this.auditService.invokeAssosciateFunction.subscribe(() => {
			this.week = this.auditService.selectedWeek;
			//console.log("Selected batch: " + this.auditService.selectedBatch['batchId']);
			this.batchId = this.auditService.selectedBatch['batchId'];
			this.auditService.getOverallBatchNoteByWeek(this.batchId, this.week).subscribe(batchNote => {
				this.note = batchNote;
			});

		});
		
	}


	setScore(qcStatus: string, noteId: number) {
		//TO-DO
		// addd functionalities to post/update the changed score(smiley) in the backend.
	}

	ngOnDestroy() {
		if(this.noteSubscription){
			this.noteSubscription.unsubscribe();
		}
	}
}
