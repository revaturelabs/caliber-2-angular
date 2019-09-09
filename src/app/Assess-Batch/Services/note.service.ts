import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Note } from 'src/app/Batch/type/note';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {WeeklyAssociateNotes} from "../../app.dto";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  constructor(private http: HttpClient) { }
  assessmentUrl = environment.serverRootURL + '/assessment';
  userUrl = environment.serverRootURL + '/user';
  updateNote = '/all/note/update';
  traineeBatchIdURL = '/all/trainee?batch=';
  batchesYearURL = '/vp/batch/';
  yearsURL = '/all/batch/valid_years';
  noteAllURL = '/all/note/all';
  noteURL = '/all/note/';
  notePut = '/all/note/update';
  notePost = '/all/note/create'
  batchNotesByWeekUrl = '/all/note/batch/';
  batchNotesByTraineeId = '/all/note/trainee/'
  noteEmitter = new EventEmitter<Note[]>();
  weekEmitter = new EventEmitter<number>();
  batchIdEmitter = new EventEmitter<number>();

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.assessmentUrl + this.noteAllURL);
  }

  getBatchNotesByWeek(batchId: number, weekId: number): Observable<Note[]> {
    return this.http.get<Note[]>(this.assessmentUrl + this.batchNotesByWeekUrl + batchId + "?week=" + weekId);
  }
  getBatchNotesByTraineeId(traineeId: number): Observable<Note[]> {
    return this.http.get<Note[]>(this.assessmentUrl + this.batchNotesByTraineeId + traineeId);
  }

  getNoteMapByBatchIdAndWeekNumber(batchId: number, weekId: number): Observable<WeeklyAssociateNotes> {
    return this.http.get<WeeklyAssociateNotes>(this.getNoteMapUrl(batchId, weekId));
  }

  getBatchNoteByBatchIdAndWeekNumber(batchId: number, weekNumber: number): Observable<Note> {
    return this.http.get<Note>(`${this.assessmentUrl}/batch/${batchId}/${weekNumber}/note`);
  }

  putNote(note): Observable<object> {
    return this.http.put<object>(this.assessmentUrl + this.updateNote, note);
  }

  postNote(note: Note): Observable<Note> {

    return this.http.post<Note>(this.assessmentUrl + this.notePost, note);
  }

  private getNoteMapUrl(batchId: number, weekNumber: number): string {
    return `${this.assessmentUrl}/all/note/batch/${batchId}/${weekNumber}`;
  }
}
