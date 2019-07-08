import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LastQualityAuditService } from '../../services/last-quality-audit.service';
import { LocationService } from '../../service/location.service';
import { Location } from '../../models/location';
import { AssessBatchService } from '../../../Assess-Batch/Services/assess-batch.service';
import { Batch } from 'src/app/Batch/type/batch';
import { QANote } from 'src/app/reports/Models/qanote';
import { QanoteService } from '../../service/qanote.service';
import { HomeService } from '../../service/home.service';


@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: [ './home-toolbar.component.css' ]
})

export class HomeToolbarComponent implements OnInit {
  @Output() submitHomeOutput:EventEmitter<number> = new EventEmitter<number>();
  locations: Location[];
  states: string[];
  selectedState: string;
  batches: Batch[] = [];
  selectableLocations: Location[] = [];
  citiesInLocation: Location[] = [];
  selectedLocation: Location;
  showStates: boolean;
  qaNotesAllNotes: QANote[];
  qaNotesByBatch: QANote[][];
  // currentDateTime: number = new Date().getTime();
  currentDateTime: number = 1541394000000;

  allLocations:Location;

  constructor(private locationService: LocationService, private batchService: AssessBatchService,
              private qaNoteService: QanoteService, private homeService: HomeService,
              private lastQualityAuditService: LastQualityAuditService) {
    this.showStates = false;
    // this.getLocations();
    // this.cities = [''];
  }

  ngOnInit() {
    this.initializeAllLocations();
  }


  // getLocations() {
  //   this.lastQualityAuditService.getStateLocations().subscribe(
  //     (locations) => {
  //       this.locations = locations;
  //   });
  // }

  // updateState(state) {
  //   for (let locationIndex = 0; locationIndex < this.locations.length; locationIndex++) {
  //     if (this.locations[locationIndex].state === state) {
  //       if (!this.cities.includes(this.locations[locationIndex].city)) {
  //         this.cities.push(this.locations[locationIndex].city);
  //         console.log(this.cities);
  //       }
  //     }
  //   this.cities.shift();
  //   }
  // }

  calShowState(value){
    if(value){
      this.showStates = true; 
    }else{
      this.showStates = false;
    }
    this.selectState(value);
  }

  selectState(state:string){
    this.selectedState = state;
    console.log(state)
    this.citiesInLocation=[];
    if(state === ""){
      console.log("All states selected")
      this.citiesInLocation = this.locations.map((element)=>element)
    }else{     
      this.locations.forEach((city)=>{
        if(city.state == state && this.citiesInLocation.indexOf(city) == -1){
          this.citiesInLocation.push(city);
        }
      });
      if(this.citiesInLocation.length>0){
      }else{
        this.selectedLocation = null;
      }
    }
    this.initializeCurrentBatchesFromLocations(this.citiesInLocation);
  }

  selectStateAndCity(state:string, cityLocation:Location){
    this.selectedState = state;
    this.citiesInLocation=[];
    if(state === ""){
      console.log("All states selected")
      this.citiesInLocation = this.locations.map((element)=>element)
    }else{     
      this.locations.forEach((city)=>{
        if(city.state == state && cityLocation.city === city.city && this.citiesInLocation.indexOf(city) == -1){
          this.citiesInLocation.push(city);
        }
      });
      if(this.citiesInLocation.length>0){
      }else{
        this.selectedLocation = null;
      }
    }
    this.initializeCurrentBatchesFromLocations(this.citiesInLocation);
  }

  selectCity(city :number){

    if(city != -1){
      this.selectStateAndCity(this.selectedState, this.citiesInLocation[city]);
    }else{
      this.selectState(this.selectedState);
    }
  }

  initializeAllLocations(){
    this.locationService.getAllLocations().subscribe(
      (locations)=>{
        this.locations = locations;
        this.selectedLocation = null;
        if(this.locations.length>0){
          this.initializeCurrentBatches();
        }
    });
  }

  initializeCurrentBatches(){
    this.batches=[];
    this.batchService.getAllBatches().subscribe(
      (batches)=>{
        let locations = [];
        batches.forEach((batch)=>{
          // const currentDateTime = new Date().getTime();
          const currentDateTime = this.currentDateTime;
          const batchDateTime = Number.parseInt(batch.endDate.toString())
          if( batchDateTime > currentDateTime){
            this.batches.push(batch);
            this.locations.forEach(
              (batchLocation)=>{
                if(batch.locationId === batchLocation.id)
                  locations.push(batchLocation);
            });
          }
        });
        console.log(this.batches);
        this.locations = locations;
        this.setStatesViaLocations();
        this.homeService.setLocationsDataStore(locations);
        this.homeService.setBatchesDataStore(this.batches);
        this.initilaizeAllQANotes(this.batches);
    });
  }

  initializeCurrentBatchesFromLocations(locations: Location[]){
    this.batches=[];
    console.log("trying");
    this.batchService.getAllBatches().subscribe(
      (batches)=>{
        batches.forEach((batch)=>{
          // const currentDateTime = new Date().getTime();
          const currentDateTime = this.currentDateTime;
          const batchDateTime = Number.parseInt(batch.endDate.toString())
          if( batchDateTime > currentDateTime){
            
            let added = false;
            locations.forEach(
              (batchLocation)=>{
                if(batch.locationId === batchLocation.id && !added){
                  this.batches.push(batch);
                  added = true
                }
                  
            });
          }
        });
        console.log(this.batches);
        console.log("responded");

        this.setStatesViaLocations();
        this.homeService.setLocationsDataStore(this.locations);
        this.homeService.setBatchesDataStore(this.batches);
        this.initilaizeAllQANotes(this.batches);
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
            this.homeService.setQANotesDataStore(this.qaNotesByBatch);
            this.submitHomeOutput.emit(this.qaNotesByBatch.length);
          });

      })
  }

  setStatesViaLocations(){
    this.states = [];
    this.locations.forEach((element)=>{
      if(!this.states.includes(element.state)){
        this.states.push(element.state);
      }
    })
  }
}

