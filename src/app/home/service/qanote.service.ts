import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QANote } from 'src/app/reports/Models/qanote';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class QanoteService {
  url = environment.serverRootURL + '/qa/';
  qaNotesAllURL = 'audit/notes/all/';

  constructor(private http: HttpClient) { }

  getAllQANotes(batch):Observable<QANote[]> {
    let url = this.url + this.qaNotesAllURL + batch.batchId;
    return this.http.get<QANote[]>(url, httpOptions);//
  }
}

