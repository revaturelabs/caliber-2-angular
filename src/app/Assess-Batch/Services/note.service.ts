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
  url = 'http://localhost:9097/';
  url3 = 'http://localhost:9090/all/note/update';
  traineeBatchIdURL = '/all/trainee?batch=';
   batchesYearURL = '/vp/batch/';
   yearsURL = '/all/batch/valid_years';
   noteAllURL = '/all/note/all';
  noteURL = '/all/note/';
  notePut='/all/note/update';
  notePost='all/note/create'
  batchNotesByWeekUrl='/all/note/batch/';
  noteEmitter = new EventEmitter<Note[]>();
  weekEmitter= new EventEmitter<number>();
  batchIdEmitter= new EventEmitter<number>();

   getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.url + this.noteAllURL);
  }

  getBatchNotesByWeek(batchId: number, weekId: number): Observable<Note[]>{
    console.log(batchId);
    console.log(weekId);
    return this.http.get<Note[]>(this.url + this.batchNotesByWeekUrl + batchId + "?week=" + weekId);
  }

  putNote(note): Observable<object>{
    console.log(note);
    return this.http.put<object>(this.url3, note);
  }

  postNote(note: Note): Observable<Note>{
   
    return this.http.post<Note>(this.url + this.notePost, note);
  }
}