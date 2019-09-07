import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Batch} from "../../../Batch/type/batch";
import { TraineeService } from 'src/app/Assess-Batch/Services/trainee.service';
import {BehaviorSubject, combineLatest, Observable, of} from "rxjs";
import {combineAll, concatMap, distinctUntilChanged} from "rxjs/operators";
import {Trainee} from "../../../Batch/type/trainee";
import {NoteService} from "../../../Assess-Batch/Services/note.service";
import {WeeklyAssociateNotes} from "../../../app.dto";
import {Note} from "../../../Batch/type/note";

@Component({
  selector: 'app-assess-associate-list',
  templateUrl: './assess-associate-list.component.html',
  styleUrls: ['./assess-associate-list.component.css']
})
export class AssessAssociateListComponent implements OnInit, OnChanges {

  @Input("batch") batch: Batch;
  private selectedBatch: BehaviorSubject<Batch> = new BehaviorSubject<Batch>(this.batch);
  private trainees$: Observable<Trainee[]>;
  private notes$: Observable<WeeklyAssociateNotes>;
  trainees: Trainee[] = [];
  selectedWeek: number;
  notes: Map<number, Note[]>;
  private selectedWeekSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @Output("onBatchUpdate") onBatchUpdate: EventEmitter<Batch> = new EventEmitter<Batch>(true);

  notesLoaded: boolean = false;

  constructor(
    private traineeService: TraineeService,
    private noteService: NoteService,
  ) { }

  ngOnInit() {
    // Populate observable when batch is selected from dropdown
    this.trainees$ = this.selectedBatch.asObservable().pipe(
      concatMap(batch => {
        // batch === undefined until we select one from the dropdown
        if (batch !== undefined) {
          this.setUpdatedBatch(batch);
          return this.traineeService.getTraineesByBatchId(batch.batchId);
        } else {
          // Return an empty observable if batch === undefined
          return of([]);
        }
      })
    );

    this.trainees$.subscribe(
      data => {
        this.trainees = data
      }
    );

    combineLatest(this.selectedWeekSubject.asObservable(), this.selectedBatch.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([week, batch]) => {
        if (Boolean(batch) && Boolean(batch.batchId) && Boolean(week)) {
          this.notes$ = this.noteService.getNoteMapByBatchIdAndWeekNumber(batch.batchId, week)
          this.notes$.subscribe(
            data => {
              this.notes = new Map();
              // Iterate over map recieved from backend
              for (let temp of Object.keys(data)) {
                if (Boolean(temp)) {
                  this.notes.set(Number.parseInt(temp), data[temp])
                }
              }
              this.notesLoaded = true;
            }
          )
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (change.currentValue !== undefined) {
        this.setSelectedWeek(this.batch.weeks);
        this.selectedBatch.next(change.currentValue);
      }
    }
  }

  setSelectedWeek(week: number) {
    this.notesLoaded = false;
    this.selectedWeek = week;
    this.selectedWeekSubject.next(this.selectedWeek);
  }

  getNotesForTrainee(traineeId: number): Note {
    if (this.notes.has(traineeId)) {
      return this.notes.get(traineeId)[0];
    }
  }

  setUpdatedBatch(batch: Batch) {
    this.onBatchUpdate.emit(batch);
  }
}
