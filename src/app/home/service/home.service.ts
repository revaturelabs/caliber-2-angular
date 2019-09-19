import { Injectable } from '@angular/core';
import { Location } from '../../domain/model/location.dto';
import {Batch} from "../../domain/model/batch.dto";
import {QcNote} from "../../domain/model/qc-note.dto";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private locationsDataStore: Location[];
  private batchesDataStore: Batch[] = [];
  private qaNotesDataStore: QcNote[][]=[];

  constructor() { }

  getLocationsDataStore(): Location[]{
    return this.locationsDataStore;
  }

  getBatchesDataStore(): Batch[]{
    return this.batchesDataStore;
  }

  getQANotesDataStore():QcNote[][]{
    return this.qaNotesDataStore;
  }

  setLocationsDataStore(locations: Location[]){
    this.locationsDataStore = locations;
  }

  setBatchesDataStore(batches: Batch[]){
    this.batchesDataStore = batches;
  }

  setQANotesDataStore(qaNotes: QcNote[][]){
    this.qaNotesDataStore = qaNotes;
  }
}
