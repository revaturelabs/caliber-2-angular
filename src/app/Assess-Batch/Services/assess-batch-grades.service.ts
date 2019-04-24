import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { traineeAssessment, Grades } from '../../User/user/types/trainee'


@Injectable({
  providedIn: 'root'
})
export class AssessBatchGradeService {

  url = 'http://localhost:9090';
  gradesByIdURL = '/all/grade/batch/';
  assessmentsByIdURL = '/all/assessment/batch/';
  allAssessments: traineeAssessment[] = [];
  allGrades: Grades[] = [];
  assessments = new EventEmitter<traineeAssessment[]>();
  grades = new EventEmitter<Grades[]>();

  constructor(private http: HttpClient) { }

  getAssessmentsByBatchId(id: number): Observable<traineeAssessment[]> {
    return this.http.get<traineeAssessment[]>(this.url + this.assessmentsByIdURL + id);
  }

  getGradesByBatchId(id: number): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.gradesByIdURL);
  }

  storeAssessments(entry: traineeAssessment[]) {
    this.allAssessments = entry;
  }

  returnAssessments(): traineeAssessment[] {
    return this.allAssessments;
  }


  
}