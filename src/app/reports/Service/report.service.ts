import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Batch } from 'src/app/Batch/type/batch';
import { traineeAssessment, Grade, Trainee } from 'src/app/Batch/type/trainee';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { Category } from 'src/app/User/user/types/trainee';
import { QANote } from '../Models/qanote';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url = environment.serverRootURL;

  batchesYearURL = '/vp/batch/';
  batchAllURL = 'batchAllURL';
  yearsURL = '/qa/batch/valid-years';
  gradesAllURL = '/assessment/all/grade/batch/';
  gradesTotalAverageURL = '/assessment/all/grade/all'
  gradesByTraineeURL = '/assessment/all/grade/trainee/';
  qaNotesAllURL = '/qa/audit/notes/all/';
  qaNotesURL = '/qa/audit/notes/';
  categoryAllURL = '/category/all/active';
  assessmentsAllURL : string = '/assessment/all/assessment/batch/';

  batch: Batch;
  week: number;
  trainee:Trainee;
  averageGradeScore : number;
  gradesDataStore : Grade[];
  qaNoteDataStore : QANote[];
  traineeDataStore: Trainee[];
  categoryDataStore : Category[];
  assessmentsDataStore : Assessment[];
  gradesOfTraineeDataStore : Grade[];
  
  constructor(private http: HttpClient) { }

  getAllYears(): Observable<number[]> {
    // console.log(environment);
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + this.categoryAllURL);
  }

  getBatchesByYear(year : number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url +'/batch' + this.batchesYearURL + year, httpOptions);
  }

  getAllGradesForTotalAverage(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url + this.gradesTotalAverageURL, httpOptions);
  }

  getAllAssessments():Observable<Assessment[]> {
    let weekStr = this.determineWeek(this.week);
    return this.http.get<Assessment[]>(this.url + this.assessmentsAllURL + this.batch.batchId + weekStr, httpOptions)
  }

  getAllGrades():Observable<Grade[]> {
    // if(this.trainee != undefined && this.trainee != null && this.trainee.traineeId == -1){
      let weekStr = this.determineWeek(this.week);
      return this.http.get<Grade[]>(this.url + this.gradesAllURL + this.batch.batchId + weekStr, httpOptions)
    // }else if(this.trainee != undefined && this.trainee != null){
    //   return this.http.get<Grade[]>(this.url + this.gradesByTraineeURL + this.trainee.traineeId, httpOptions)
    // }
  }

  getAllTraineeGrades():Observable<Grade[]> {
    if(this.trainee != undefined && this.trainee != null){
      return this.http.get<Grade[]>(this.url + this.gradesByTraineeURL + this.trainee.traineeId, httpOptions)
    }
  }

  getAllQANotes():Observable<QANote[]> {
    let url;
    if(this.week == 0){
      url = this.url + this.qaNotesAllURL + this.batch.batchId;
      // console.log(url);
      return this.http.get<QANote[]>(url, httpOptions)
    }
    else{
      url = this.url + this.qaNotesURL + this.batch.batchId +"/"+this.week;
      // console.log(url);
      return this.http.get<QANote[]>(url, httpOptions)
    }
  }

  //// add a query for all weeks
  //// http://localhost:10000/qa/audit/notes/2050/1

  setGradeDataStore(gradesDataStore: Grade[]){
    this.gradesDataStore = gradesDataStore;
  }

  setQANoteDataStore(qaNoteDataStore: QANote[]){
    this.qaNoteDataStore = qaNoteDataStore;
  }

  setTraineeDataStore(traineeDataStore: Trainee[]){
    this.traineeDataStore = traineeDataStore;
  }

  setCategoryDataStore(categoryDataStore: Category[]){
    this.categoryDataStore = categoryDataStore;
  }

  setAssessmentDataStore(assessmentDataStore: Assessment[]){
    this.assessmentsDataStore = assessmentDataStore;
  }

  setGradesOfTraineeDataStore(gradesOfTraineeDataStore : Grade[]){
    this.gradesOfTraineeDataStore = gradesOfTraineeDataStore
  }

  determineWeek(week:number):String{
    if(week>0){
      return "?week="+week;
    }
    return "";
  }

  setAverageGradeScore(averageGradeScore : number){
    this.averageGradeScore = averageGradeScore;
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

  getTrainee(){
    return this.trainee
  }

  getGradeDataStore() : Grade[]{
    return this.gradesDataStore;
  }

  getQANoteDataStore(): QANote[]{
    return this.qaNoteDataStore;
  }

  getTraineeDataStore() : Trainee[]{
    return this.traineeDataStore;
  }

  getCategoryDataStore() :Category[]{
    return this.categoryDataStore;
  }

  getAssessmentDataStore(): Assessment[]{
    return this.assessmentsDataStore;
  } 

  getGradesOfTraineeDataStore(){
     return this.gradesOfTraineeDataStore;
  }

  getAverageGradeScore(){
    return this.averageGradeScore;
  }
}