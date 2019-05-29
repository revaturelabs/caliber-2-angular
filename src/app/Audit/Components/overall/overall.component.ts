import { Component, OnInit, HostListener } from '@angular/core';
import { AuditService } from '../../Services/audit.service';
import { QcNote } from '../../types/note';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {
	overallQcStatus: String;
	noteContent: String;
	batchId: number;
	week: number;

	//Smiley face status
	smile: string; meh: string; frown: string;

	constructor(private auditService: AuditService) { }

	ngOnInit() {
		this.auditService.invokeAssosciateFunction.subscribe(() => {
			this.week = this.auditService.selectedWeek;
			//console.log("Selected batch: " + this.auditService.selectedBatch['batchId']);
			this.batchId = this.auditService.selectedBatch['batchId'];
			this.auditService.getOverallBatchNoteByWeek(this.batchId, this.week).subscribe(batchNote => {
				console.log(batchNote);
				this.overallQcStatus = batchNote['qcStatus'];
				this.noteContent = batchNote['content'];
				this.getOverallQcSmiley();
			});
			
		});

	}



  /**
   * This function to get the overall qc status and display as a color code in the html
   */
	getOverallQcSmiley() {
			if (this.overallQcStatus == 'Good') {
				this.smile = 'fa-smile-o-color';
				this.meh = '';
				this.frown = '';
			} else if (this.overallQcStatus == 'Average') {
				this.meh = 'fa-meh-o-color';
				this.smile = '';
				this.frown = '';
			} else if (this.overallQcStatus == 'Poor') {
				this.frown = 'fa-frown-o-color';
				this.smile = '';
				this.meh = '';
			} else if (this.overallQcStatus == 'Undefined') {
				this.smile = '';
				this.meh = '';
				this.frown = '';
			}
	}


  /*
	qc.getAssessmentsByBatchId = function(batchId) {
		$log.debug("In assessment");
		return $http({
			url : "/qc/assessment/byBatchId/" + batchId + "/",
			method : "GET"
		}).then(function(response) {
			$log.debug("Assessments retrieved successfully");
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	// get all assessments
	qc.getAllAssessments = function(weekId) {
		return $http({
			url : "/qc/assessment/byWeek/" + weekId + "/",
			method : "GET"
		}).then(function(response) {
			$log.debug("Assessments retrieved successfully");
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};
	
	// get all assessment categories for the week
	qc.getAllAssessmentCategories = function(batchId, weekId) {
		return $http({
			url : "/all/assessments/categories/batch/" + batchId + "/week/" + weekId + "/",
			method : "GET"
		}).then(function(response) {
			$log.debug("Assessments categories retrieved successfully");
			$log.debug("response");
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
  }; */


}
