import { Injectable, EventEmitter } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QcNote } from 'src/app/Audit/types/note';
import { Trainee } from 'src/app/Batch/type/trainee';
import { Tag } from '../types/Tag';


@Injectable({
  providedIn: 'root'
})
export class AuditService {
  // http://localhost:9095/ environment.serverRootURL
  url = environment.serverRootURL;
  overallBatchNote: QcNote;
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
  allActiveCategoriesURL = '/category/all/active';
  selectedQuarter: number = 1;
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek: number;
  selectedTrainee : Trainee;
  //selectedWeekChanged = new Subject<boolean>();
  notes: QcNote[] = [];
  categoriesByBatchByWeek: Tag[] = [];
  categoryTags: Map<string, Tag> = new Map<string,Tag>();

  invokeAssosciateFunction = new EventEmitter();
  subsVar: Subscription;

  constructor(private http: HttpClient) { }

  getAllActiveCategories(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url + this.allActiveCategoriesURL);
  }

  getCategoriesByBatchByWeek(batchId: number, week: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url + this.categoriesByBatchByWeekURL + `${batchId}/${week}/all`);
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

  sendCategory(categoryToSend: Tag): Observable<Tag>{
    return this.http.post<Tag>(this.url + this.updateCategoryURL, categoryToSend);
  }

  deleteCategory(categoryId: number): Observable<void>{
    return this.http.delete<void>(this.url + this.deleteCategoryURL + categoryId);
  }

  sortAlphabetically(notes: any) {
    notes.sort((a: { trainee: { name: number; }; }, b: { trainee: { name: number; }; }): any => {
      if (a.trainee.name > b.trainee.name) {
        return 1;
      }
      else {
        return -1;
      }
    });
  }
}
