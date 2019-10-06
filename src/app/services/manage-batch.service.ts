import {Injectable} from "@angular/core";
import {BatchService} from "./subvertical/batch/batch.service";
import {Observable} from "rxjs";
import {Batch} from "../domain/model/batch.dto";
import {ChronoService} from "./subvertical/util/chrono.service";
import {Location} from "../domain/model/location.dto";
import {LocationService} from "./subvertical/location/location.service";
import {SkillType} from "../domain/skilltype.dto";
import {SkilltypeService} from "./subvertical/skilltype/skilltype.service";
import {Trainer} from "../domain/model/trainer.dto";
import {TrainerService} from "./subvertical/user/trainer.service";
import {Trainee} from "../domain/model/trainee.dto";
import {TraineeService} from "./subvertical/user/trainee.service";

@Injectable()
export class ManageBatchService {

  constructor(
    private batchService: BatchService,
    private chronoService: ChronoService,
    private locationService: LocationService,
    private skillTypeService: SkilltypeService,
    private trainerService: TrainerService,
    private traineeService: TraineeService
  ) {}

  getAllYears(): Observable<number[]> {
    return this.chronoService.getValidYears();
  }

  getCurrentYear(): number {
    return this.chronoService.getCurrentYear();
  }

  getTraineesByBatchId(batchId: number): Observable<Trainee[]> {
    return this.batchService.getTraineesByBatchId(batchId);
  }

  getBatchByBatchId(batchId: number): Observable<Batch> {
    return this.batchService.getBatchById(batchId);
  }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.batchService.getBatchesByYear(year);
  }

  getAllTrainers(): Observable<Trainer[]> {
    return this.trainerService.getAllTrainers();
  }

  getTraineeCount(batchIds: number[]): Observable<number[][]> {
    return this.batchService.getTraineeCountByBatchIds(batchIds);
  }

  switchBatchForTrainee(trainee: Trainee): Observable<Trainee> {
    return this.traineeService.switchBatch(trainee);
  }

  getTraineeCountByBatchId(batchId: number): Observable<number> {
    return this.batchService.getTraineeCountByBatchId(batchId);
  }

  createTrainee(trainee: Trainee): Observable<Trainee> {
    return this.traineeService.createTrainee(trainee);
  }

  updateTrainee(trainee: Trainee): Observable<Trainee> {
    return this.traineeService.updateTrainee(trainee);
  }

  deleteTrainee(trainee: Trainee): Observable<Trainee> {
    return this.traineeService.deleteTrainee(trainee);
  }

  deleteBatch(batchId: number): Observable<Batch> {
    return this.batchService.deleteBatch(batchId);
  }

  getAllLocations(): Observable<Location[]> {
    return this.locationService.getAllLocations();
  }

  getAllSkillTypes(): Observable<string[]> {
    return this.skillTypeService.getAllSkillTypes();
  }

  createBatch(batch: Batch): Observable<Batch> {
    return this.batchService.createBatch(batch);
  }

  updateBatch(batch: Batch): Observable<Batch> {
    return this.batchService.updateBatch(batch);
  }
}
