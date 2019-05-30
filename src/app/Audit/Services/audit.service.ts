import { Injectable, EventEmitter } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Note } from 'src/app/Batch/type/note';
import { QcNote } from 'src/app/Audit/types/note';
import { Trainee } from 'src/app/Batch/type/trainee';

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
saveFlagModalURL= '/qa/trainee/update'; 
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

  sendNote(noteToSend: QcNote): Observable<QcNote> {
    return this.http.put<QcNote>(this.url + this.updateNoteURL, noteToSend);
  }

  saveFlagModal(newNote: QcNote): Observable<Trainee>{
    console.log(newNote.trainee);
    return this.http.put<Trainee>(this.url + this.saveFlagModal, newNote.trainee);
  }
}
