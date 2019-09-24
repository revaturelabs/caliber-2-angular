import {Injectable} from "@angular/core";
import {Location} from "../domain/model/location.dto";
import {Batch} from "../domain/model/batch.dto";
import {QcNote} from "../domain/model/qc-note.dto";
import {LocationService} from "./subvertical/location/location.service";
import {Observable} from "rxjs";
import {QaNotesService} from "./subvertical/quality-audit/qa-notes.service";
import {BatchService} from "./subvertical/batch/batch.service";
import {Trainee} from "../domain/model/trainee.dto";
import {TraineeService} from "./subvertical/user/trainee.service";
import {Assessment} from "../domain/model/assessment.dto";
import {AssessmentService} from "./subvertical/assessment/assessment.service";
import {CategoryService} from "./subvertical/category/category.service";
import {Category} from "../domain/model/category.dto";
import {MissingGrade} from "../domain/dto/missing-grades.dto";
import {environment} from "../../environments/environment";
import {AssessmentGradeService} from "./subvertical/assessment/assessment-grade.service";

@Injectable()
export class HomeService {

  private _locationsDataStore: Location[];
  private batchesDataStore: Batch[] = [];
  private qaNotesDataStore: QcNote[][]=[];
  selectedLocation : Location;
  locationsDataStore : Location[];

  constructor(
    private locationService: LocationService,
    private qaNoteService: QaNotesService,
    private batchService: BatchService,
    private traineeService: TraineeService,
    private assessmentService: AssessmentService,
    private assessmentGradeService: AssessmentGradeService,
    private categoryService: CategoryService
  ) {}

  getAllLocations(): Observable<Location[]> {
    return this.locationService.getAllLocations();
  }

  getCurrentBatches(): Observable<Batch[]> {
    return this.batchService.getAllCurrentBatches();
  }

  getTraineesByBatchId(batchId: number): Observable<Trainee[]> {
    return this.traineeService.getTraineesByBatchId(batchId);
  }

  getAssessmentsByBatchIdAndWeek(batchId: number, week: number): Observable<Assessment[]> {
    return this.assessmentService.getAssessmentsByBatchIdAndWeek(batchId, week);
  }

  addMissingGrade(batches: Batch[]): Observable<MissingGrade[]> {
    return this.assessmentGradeService.addMissingGrades(batches);
  }

  createLocation(location: Location): Observable<Location> {
    return this.locationService.createLocation(location);
  }

  updateLocation(location: Location): Observable<Location> {
    return this.locationService.updateLocation(location);
  }

  getQcBatchNoteByBatchId(batchId: number): Observable<QcNote[]> {
    return this.qaNoteService.getAllQcNotesByBatch(batchId);
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.categoryService.getCategoriesById(categoryId);
  }

  getLocationsDataStore(): Location[]{
    return this._locationsDataStore;
  }

  getBatchesDataStore(): Batch[]{
    return this.batchesDataStore;
  }

  getQANotesDataStore():QcNote[][]{
    return this.qaNotesDataStore;
  }

  setLocationsDataStore(locations: Location[]){
    this._locationsDataStore = locations;
  }

  setBatchesDataStore(batches: Batch[]){
    this.batchesDataStore = batches;
  }

  setQANotesDataStore(qaNotes: QcNote[][]){
    this.qaNotesDataStore = qaNotes;
  }

  getlocationsDataStore(){
    return this.locationsDataStore;
  }

  setlocationsDataStore(locations : Location[]){
    this.locationsDataStore = locations;
  }

  getSelectedLocation(){
    return this.selectedLocation;
  }

  setSelectedLocation(location : Location){
    this.selectedLocation = location;
  }
}
