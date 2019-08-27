import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { QANote } from 'src/app/reports/Models/qanote';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private locationsDataStore: Location[];
  private batchesDataStore: Batch[] = [];
  private qaNotesDataStore: QANote[][]=[];

  constructor() { }

  getLocationsDataStore(): Location[]{
    return this.locationsDataStore;
  }

  getBatchesDataStore(): Batch[]{
    return this.batchesDataStore;
  }

  getQANotesDataStore():QANote[][]{
    return this.qaNotesDataStore;
  }

  setLocationsDataStore(locations: Location[]){
    this.locationsDataStore = locations;
  }

  setBatchesDataStore(batches: Batch[]){
    this.batchesDataStore = batches;
  }

  setQANotesDataStore(qaNotes: QANote[][]){
    this.qaNotesDataStore = qaNotes;
  }
}
