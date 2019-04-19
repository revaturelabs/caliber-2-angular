import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Note } from 'src/app/Batch/type/note';

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
  
 
   getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.url + this.noteAllURL);
  }
}