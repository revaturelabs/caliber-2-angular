import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { Location } from '../../models/location';
import { AssessBatchService } from '../../../Assess-Batch/Services/assess-batch.service';
import { Batch } from 'src/app/Batch/type/batch';
import { QANote } from 'src/app/reports/Models/qanote';
import { QanoteService } from '../../service/qanote.service';


@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: [
    './home-toolbar.component.css'
  ]
})
export class HomeToolbarComponent implements OnInit {
  @Output() submitHomeOutput:EventEmitter<number> = new EventEmitter<number>();
  locations: Location[];
  states: string[];
  batches: Batch[] = [];
  citiesInLocation: Location[] = [];
  selectedLocation: Location;
  showStates: boolean;
  qaNotesAllNotes: QANote[];
  qaNotesByBatch: QANote[][];

  allLocations:Location;

  constructor(private locationService: LocationService, private batchService: AssessBatchService,
              private qaNoteService: QanoteService) {
    this.showStates = false;
  }

  ngOnInit() {
    this.initializeCurrentBatches();
    this.initializeAllLocations();
  }
  //build array of cities of a give state

  calShowState(value){
    if(value){
      this.showStates = true;
      this.selectState(value);
    }else{
      this.showStates = false;
    }
  }

  selectState(state:string){
    this.citiesInLocation=[];
    
    this.locations.forEach((city)=>{
      if(city.state == state){
        this.citiesInLocation.push(city);
      }
    });
    if(this.citiesInLocation.length>0){
      this.selectedLocation = this.citiesInLocation[0];
      this.locationService.setSelectedLocation(this.citiesInLocation[0]);
    }else{
      this.selectedLocation = null;
      this.locationService.setSelectedLocation(null);
    }
  }

  selectCity(city : Location){
    if(city != null){
      this.selectedLocation = city;
      this.locationService.setSelectedLocation(city);
    }
  }

  initializeCurrentBatches(){
    this.batchService.getAllBatches().subscribe(
      (batches)=>{
        batches.forEach((batch)=>{
          const currentDateTime = new Date().getTime();
          const batchDateTime = Number.parseInt(batch.endDate.toString())
          if( batchDateTime > currentDateTime){
            this.batches.push(batch)
          }
        })
        console.log(this.batches);
        this.initilaizeAllQANotes(this.batches);
    });
  }

  initializeAllLocations(){
    this.locationService.getAllLocations().subscribe(
      (locations)=>{
        this.locationService.setlocationsDataStore(locations);
        this.locations = locations;
        this.states = [];
        this.locations.forEach((element)=>{
          if(!this.states.includes(element.state)){
            this.states.push(element.state);
          }
        })
        this.selectedLocation = null;
        this.locationService.setSelectedLocation(null);
    });
  }

  initilaizeAllQANotes(batches: Batch[]){
    this.qaNotesByBatch = [];
    batches.forEach(
      (element)=>{
        this.qaNoteService.getAllQANotes(element).subscribe(
          (qaNotesOfBatch)=>{
            let indexOfBatch = batches.indexOf(element);
            let tempBatchArray: QANote[] =[];
            qaNotesOfBatch.forEach(
              (qaNote)=>{
              tempBatchArray.push(qaNote);
            })
            this.qaNotesByBatch.push(tempBatchArray);
            console.log(this.qaNotesByBatch);
            this.submitHomeOutput.emit(this.qaNotesByBatch.length);
          });
      })
  }

  ///
  /// 1611
  /// 1611 Nov14 Java (AP)","trainingType":"Revature","skillType":"PEGA BPM","trainer":"Dan Pickles","coTrainer":null,"locationId":2,"location":"Connection t
  /// current batch end date > current date = new Date()
  ///                                  date.getTime() == 1562475723514
  /// Need to set up qaservice to get all qa notes
  /// Need to get all batches and find out which batches are ending after current date to present data.

}
