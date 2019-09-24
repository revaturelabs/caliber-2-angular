import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Note} from "../../../domain/model/assessment-note.dto";
import {WeeklyAssociateNotes} from "../../../domain/dto/weekly-associate-notes.dto";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AssessmentNotesService {

  constructor(
    private http: HttpClient
  ) {}

  upsertNote(note: Note): Observable<Note> {
    return this.http.put<Note>(environment.api.assessments.upsert, note);
  }

  getNoteMapByBatchIdAndWeek(batchId: number, week: number): Observable<WeeklyAssociateNotes> {
    return this.http.get<WeeklyAssociateNotes>(environment.api.assessments.notes.byBatchAndWeek(batchId, week));
  }

  getBatchNoteByBatchAndWeek(batchId: number, week: number): Observable<Note> {
    return this.http.get<Note>(environment.api.assessments.batchNoteByBatchAndWeek(batchId, week));
  }

}
