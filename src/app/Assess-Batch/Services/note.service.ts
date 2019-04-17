import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Note } from 'src/app/Batch/type/note';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost:9090';
  traineeBatchIdURL = '/all/trainee?batch=';
   batchesYearURL = '/vp/batch/';
   yearsURL = '/all/batch/valid_years';
   noteAllURL = '/all/notes/all';
  noteURL = '/all/notes/';
  batchNotesByWeekUrl='/all/notes/all?batch=';
  noteEmitter = new EventEmitter<Note[]>();

   getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.url + this.noteAllURL);
  }

  getBatchNotesByWeek(batchId: number, weekId: number): Observable<Note[]>{
    console.log(batchId);
    console.log(weekId);
    return this.http.get<Note[]>(this.url + this.batchNotesByWeekUrl +batchId + "&week=" + weekId);
  }

  putNote(note: Note): Observable<Note>{
    return this.http.put<Note>(this.url, note, httpOptions);
  }
}