import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Batch } from 'src/app/Batch/type/batch';
import { traineeAssessment, Grade } from 'src/app/Batch/type/trainee';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { Trainee } from 'src/app/User/user/types/trainee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  // url = environment.serverRootURL;
  url = 'http://localhost:10000';
  batchesYearURL = '/vp/batch/';
  batchAllURL = 'batchAllURL';
  yearsURL = '/qa/batch/valid-years';
  gradesAllURL = '/assessment/all/grade/batch/';
  assessmentsAllURL : string = '/assessment/all/assessment/batch/';

  batch: Batch;
  week: number;
  trainee:Trainee;
  gradesDataStore : Grade[];
  assessmentsDataStore : Assessment[];
  
  constructor(private http: HttpClient) { }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  getBatchesByYear(year : number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url +'/batch' + this.batchesYearURL + year, httpOptions);
  }

  getAllAssessments():Observable<Assessment[]> {
    let weekStr = this.determineWeek(this.week);
    return this.http.get<Assessment[]>(this.url + this.assessmentsAllURL + this.batch.batchId + weekStr, httpOptions)
  }

  getAllGrades():Observable<Grade[]> {
    let weekStr = this.determineWeek(this.week);
    return this.http.get<Grade[]>(this.url + this.gradesAllURL + this.batch.batchId + weekStr, httpOptions)
  }

  setGradeDataStore(gradesDataStore: Grade[]){
    this.gradesDataStore = gradesDataStore;
  }

  setAssessmentDataStore(assessmentDataStore: Assessment[]){
    this.assessmentsDataStore = assessmentDataStore;
  }

  determineWeek(week:number):String{
    if(week>0){
      return "?week="+week;
    }
    return "";
  }

  setBatch(batch:Batch){
    this.batch = batch;
  }

  setWeek(week){
    this.week = week;
  }

  setTrainee(trainee){
    this.trainee = trainee;
  }

  getAssessmentDataStore(): Assessment[]{
    return this.assessmentsDataStore;
  }

  getGradeDataStore() : Grade[]{
    return this.gradesDataStore;
  } 
}