import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { AuditService } from '../../Services/audit.service';
import { QcNote } from '../../types/note';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit, OnDestroy {
	batchId: number;
	week: number;
	note: QcNote;
	noteSubscription: Subscription;

	isSpinning: boolean = false;
	isCheck: boolean = false;
	isError: boolean = false;

	isTyping: boolean;

	constructor(private auditService: AuditService, private errorService: ErrorService) { }

	ngOnInit() {
		this.noteSubscription = this.auditService.overallBatchNoteChanged.subscribe(data => {
			console.log(data);
			this.note = data;
		});

		this.auditService.invokeAssosciateFunction.subscribe(() => {
			this.week = this.auditService.selectedWeek;
			this.batchId = this.auditService.selectedBatch['batchId'];
			this.auditService.getOverallBatchNoteByWeek(this.batchId, this.week);

		});

	}

	showSpinner() {
		this.isSpinning = true;
		this.isCheck = false;
		this.isError = false;
	}

	clearAllSavingIcon() {
		this.isSpinning = false;
		this.isCheck = false;
		this.isError = false;
	}

	noteOnBlur(noteId: number, secondRound: boolean) {
		this.showSpinner();
		this.auditService.sendNote(this.note).subscribe(
			data => {
				if (this.isTyping == true) {
					this.isSpinning = false;
					this.isCheck = true;
					this.isError = false;
				} else {
					this.isSpinning = false;
					this.isCheck = false;
					this.isError = false;
				}

				this.isTyping = false;
			},
			issue => {
				this.isSpinning = false;
				this.isCheck = false;
				this.isError = true;
				if (issue instanceof HttpErrorResponse) {
					const err = issue as HttpErrorResponse;
					this.errorService.setError('AuditService',
						`Issue updating QcNote with noteId ${noteId}. Please contact system administrator: \n
					Status Code: ${err.status} \n
					Status Text: ${err.statusText} \n
					Error: ${err.message}`);
				}
			}
		)
		//Get rid of all marks after few seconds
		setTimeout(() => {this.clearAllSavingIcon();}, 5000);
	}

	setScore(qcStatus: string, noteId: number) {
		console.log("im here")
		this.note.qcStatus = qcStatus;
		console.log(this.note)
		this.auditService.sendNote(this.note).subscribe(
			data => {
				this.auditService.getOverallBatchNoteByWeek(this.auditService.selectedBatch['batchId'], this.auditService.selectedWeek);
			},
			issue => {
				if (issue instanceof HttpErrorResponse) {
					const err = issue as HttpErrorResponse;
					this.errorService.setError('AuditService',
						`Issue updating QcNote with noteId ${this.note.noteId}. Please contact system administrator: \n
				  Status Code: ${err.status} \n
				  Status Text: ${err.statusText} \n
				  Error: ${err.message}`);
				}
			});

	}

	ngOnDestroy() {
		if (this.noteSubscription) {
			this.noteSubscription.unsubscribe();
		}

	}
}
