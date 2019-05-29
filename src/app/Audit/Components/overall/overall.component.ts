import { Component, OnInit } from '@angular/core';
import { QcNote } from '../../types/note';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {

	//this is for dummy data. remove this after connecting to the actual backend.
	note: QcNote = {
		noteId: 4,
		content: "exmaple",
		week: 1,
		batchId: 1,
		trainee: null,
    	traineeId: 1,
		type: null,
		qcStatus: "Poor",
		updateTime: 1454462425353,
		lastSavedBy: null,
		lastSavedById: 1
	};

	constructor() { }

	ngOnInit() {
	}

	setScore(qcStatus: string, noteId: number){
		//TO-DO
		// addd functionalities to post/update the changed score(smiley) in the backend.
	}


}
