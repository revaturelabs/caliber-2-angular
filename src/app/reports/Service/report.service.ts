import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Batch } from 'src/app/Batch/type/batch';
import { traineeAssessment, Grade } from 'src/app/Batch/type/trainee';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { Trainee, Category } from 'src/app/User/user/types/trainee';

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
  qaNotesAllURL = 'qa/audit/notes/all/';
  qaNotesURL = 'qa/audit/notes/';
  categoryAllURL = '/category/all/active';
  assessmentsAllURL : string = '/assessment/all/assessment/batch/';

  batch: Batch;
  week: number;
  trainee:Trainee;
  batchDataStore : Batch[];
  gradesDataStore : Grade[];
  traineeDataStore: Trainee[];
  assessmentsDataStore : Assessment[];
  
  constructor(private http: HttpClient) { }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + this.categoryAllURL);
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

  // getAllQANotes():Observable<QANote[]> {
  //   if(this.week == 0)
  //     return this.http.get<QANote[]>(this.url + this.qaNotesAllURL + this.batch.batchId, httpOptions)
  //   else{
  //     return this.http.get<QANote[]>(this.url + this.qaNotesURL + this.batch.batchId +"/"+this.week, httpOptions)
  //   }
  // }



  //// add a query for all weeks
  //// http://localhost:10000/qa/audit/notes/2050/1

  setBatchDataStore(batchDataStore: Batch[]){
    this.batchDataStore = batchDataStore;
  }

  setGradeDataStore(gradesDataStore: Grade[]){
    this.gradesDataStore = gradesDataStore;
  }

  setTraineeDataStore(traineeDataStore: Trainee[]){
    this.traineeDataStore = traineeDataStore;
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

  getBatch(){
    return this.batch
  }

  setWeek(week){
    this.week = week;
  }

  getWeek():number{
    return this.week
  }

  setTrainee(trainee){
    this.trainee = trainee;
  }

  getBatchDataStore(): Batch[]{
    return this.batchDataStore;
  }

  getGradeDataStore() : Grade[]{
    return this.gradesDataStore;
  }

  getTraineeDataStore() : Trainee[]{
    return this.traineeDataStore;
  }

  getAssessmentDataStore(): Assessment[]{
    return this.assessmentsDataStore;
  } 
}