import { Injectable, EventEmitter } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Note } from 'src/app/Batch/type/note';
import { QcNote } from 'src/app/Audit/types/note';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
// http://localhost:9095/ environment.serverRootURL
  url = environment.serverRootURL;

  updateNoteURL = '/qa/audit/update';

  batchAllURL = '/batch/vp/batch/all';
  batchesYearURL = '/batch/vp/batch/';
  yearsURL = '/batch/all/batch/valid_years';
  notesByBatchByWeekURL = '/qa/audit/notes/';
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek: number;
  //selectedWeekChanged = new Subject<boolean>();
  notes: QcNote[] = [];

  constructor(private http: HttpClient) { }
  invokeAssosciateFunction = new EventEmitter();
  subsVar: Subscription;  
  onWeekClick() {    
    this.invokeAssosciateFunction.emit(); 
  }    
  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  getNotesByBatchByWeek(batchId: number, week: number): Observable<QcNote[]>{
    console.log(this.url + this.notesByBatchByWeekURL + batchId + '/' + week);
    return this.http.get<QcNote[]>(this.url + this.notesByBatchByWeekURL + batchId + '/'  + week);
  }
  setNotes(notesToSet: QcNote[]){
    this.notes = notesToSet;
  }

  
  sendNote(noteToSend: QcNote): Observable<Note> {
    return this.http.put<Note>(this.url + this.updateNoteURL, Note);
  }

}
