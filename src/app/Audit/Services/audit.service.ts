import { Injectable, EventEmitter } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Note } from 'src/app/Batch/type/note';
import { QcNote } from 'src/app/Audit/types/note';
import { Tag } from '../types/tag';


@Injectable({
  providedIn: 'root'
})
export class AuditService {


  // http://localhost:9095/ environment.serverRootURL
  url = environment.serverRootURL;
  batchAllURL = '/qa/batch/batches';
  batchesYearURL = '/qa/batch/';
  yearsURL = '/qa/batch/valid-years';
  notesByBatchByWeekURL = '/qa/audit/notes/';
  updateNoteURL = '/qa/audit/update';

  allActiveCategoriesURL = '/category/category/all/active';

  selectedQuarter: number = 1;
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek: number;
  //selectedWeekChanged = new Subject<boolean>();
  notes: QcNote[] = [];
  invokeAssosciateFunction = new EventEmitter();
  subsVar: Subscription;

  constructor(private http: HttpClient) { }

  getAllActiveCategories(): Observable<Object[]>{
    return this.http.get<Object[]>(this.url + this.allActiveCategoriesURL);
  }

  onWeekClick() {
    this.invokeAssosciateFunction.emit();
  }


  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  getBatchesByYearByQuarter(year: number, quarter: number): Observable<Batch[]> {
    //console.log(this.url + this.batchesYearURL + year + '/' + quarter);
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year + '/' + quarter);
  }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  getNotesByBatchByWeek(batchId: number, week: number): Observable<QcNote[]> {
    console.log(this.url + this.notesByBatchByWeekURL + batchId + '/' + week);
    return this.http.get<QcNote[]>(this.url + this.notesByBatchByWeekURL + batchId + '/' + week);
  }

  setNotes(notesToSet: QcNote[]) {
    this.notes = notesToSet;
  }

  sendNote(noteToSend: QcNote): Observable<QcNote> {
    return this.http.put<QcNote>(this.url + this.updateNoteURL, noteToSend);
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
