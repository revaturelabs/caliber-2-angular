import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
