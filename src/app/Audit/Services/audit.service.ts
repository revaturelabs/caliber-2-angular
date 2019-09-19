import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {QcNote} from "../../domain/model/qc-note.dto";
import {Batch} from "../../domain/model/batch.dto";
import {Trainee} from "../../domain/model/trainee.dto";
import {QcCategory} from "../../domain/model/qc-category.dto";


@Injectable({
  providedIn: 'root'
})
export class AuditService {
  // http://localhost:9095/ environment.serverRootURL
  url = environment.serverRootURL;

  //added new instance to fix property not defined for note object
  //in overall html component
  overallBatchNote: QcNote= new QcNote(0,"",0,0,null,0,"","",0,null,0);

  overallBatchNoteChanged = new Subject<QcNote>();
  batchAllURL = '/qa/batch/batches';
  batchesYearURL = '/qa/batch/';
  yearsURL = '/qa/batch/valid-years';
  notesByBatchByWeekURL = '/qa/audit/notes/';
  notesByTrainee = '/qa/notes/trainee/';
  updateNoteURL = '/qa/audit/update';
  saveFlagURL = '/qa/trainee/update';
  updateBatchURL = environment.serverRootURL + '/batch/all/batch/update';
  categoriesByBatchByWeekURL = '/qa/category/';
  updateCategoryURL = '/qa/category';
  deleteCategoryURL = '/qa/category/delete/';
  allActiveCategoriesURL = '/category/?active=true';
  selectedQuarter: number = 1;
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek: number;
  selectedTrainee : Trainee;
  //selectedWeekChanged = new Subject<boolean>();
  notes: QcNote[] = [];
  categoriesByBatchByWeek: QcCategory[] = [];
  categoryQcCategorys: Map<string, QcCategory> = new Map<string,QcCategory>();

  invokeAssosciateFunction = new EventEmitter();
  subsVar: Subscription;

  constructor(private http: HttpClient) { }

  getAllActiveCategories(): Observable<QcCategory[]> {
    return this.http.get<QcCategory[]>(this.url + this.allActiveCategoriesURL);
  }

  getCategoriesByBatchByWeek(batchId: number, week: number): Observable<QcCategory[]> {
    return this.http.get<QcCategory[]>(this.url + this.categoriesByBatchByWeekURL + `${batchId}/${week}/all`);
  }

  onWeekClick() {
    this.invokeAssosciateFunction.emit();
  }


  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  updateBatch(updateBatch: Batch) {
    return this.http.put(this.updateBatchURL, updateBatch);
  }

  getBatchesByYearByQuarter(year: number, quarter: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year + '/' + quarter);
  }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }
  getNotesByBatchByWeek(batchId: number, week: number): Observable<QcNote[]> {
    return this.http.get<QcNote[]>(this.url + this.notesByBatchByWeekURL + batchId + '/' + week);
  }

  getNotesForTrainee(traineeId : number) : Observable<QcNote[]>{
    return this.http.get<QcNote[]>(this.url + this.notesByTrainee + this.selectedTrainee.traineeId);
  }

  setNotes(notesToSet: QcNote[]){
    this.notes = notesToSet;
    const myset = new Set(this.notes);
    this.notes = Array.from(myset);
  }
  sendNote(noteToSend: QcNote): Observable<QcNote> {
    return this.http.put<QcNote>(this.url + this.updateNoteURL, noteToSend);
  }

  saveFlag(trainee: Trainee): Observable<Trainee> {
    return this.http.put<Trainee>(this.url + this.saveFlagURL, trainee);
  }

  getOverallBatchNoteByWeek(batchId: number, week: number) {
    return this.http.get<QcNote>(this.url + this.notesByBatchByWeekURL + 'overall/' + batchId + '/' + week).subscribe(batchNote => {
      this.overallBatchNote = batchNote;
      this.overallBatchNoteChanged.next(this.overallBatchNote);
    });
  }

  sendCategory(categoryToSend: QcCategory): Observable<QcCategory>{
    return this.http.post<QcCategory>(this.url + this.updateCategoryURL, categoryToSend);
  }

  deleteCategory(categoryId: number): Observable<void>{
    return this.http.delete<void>(this.url + this.deleteCategoryURL + categoryId);
  }

  sortAlphabetically(notes: any) {
    if(notes.length != 0){
      notes.sort((a: { trainee: { name: number; }; }, b: { trainee: { name: number; }; }): any => {
        if (a.trainee != null && b.trainee != null && a.trainee.name > b.trainee.name) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }

  }
}
