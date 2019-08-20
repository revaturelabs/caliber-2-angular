import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() submitHomeOutput: EventEmitter<number> = new EventEmitter<number>();
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
  currentDateTime: number = new Date().getTime();

  allLocations: Location;

  constructor(private locationService: LocationService, private batchService: AssessBatchService,
              private qaNoteService: QanoteService, private homeService: HomeService) {
    this.showStates = false;
  }

  ngOnInit() {
    this.initializeAllLocations();
  }

  public showInfo()
  {
    console.log('Locations');
    console.log(this.locations);
    console.log('States');
    console.log(this.states);
    console.log('Select State');
    console.log(this.selectedState);
    console.log('Batches');
    console.log(this.batches);
    console.log('Selectable Locations');
    console.log(this.selectableLocations);
    console.log('Cities in Location');
    console.log(this.citiesInLocation);
    console.log('Selected Location');
    console.log(this.selectedLocation);
    console.log('Show States');
    console.log(this.showStates);
    console.log('QA Notes All Notes');
    console.log(this.qaNotesAllNotes);
    console.log('QA Notes By Batch');
    console.log(this.qaNotesByBatch);
    console.log('Current Date Time');
    console.log(this.currentDateTime);
    console.log('----------------------------------------------------------------------------------');
  }

  calShowState(value: string) {
    if (value) {
      this.showStates = true;
    } else {
      this.showStates = false;
    }
    this.selectState(value);
  }

  selectState(state: string) {
    this.selectedState = state;
    this.citiesInLocation = [];
    if (state === '') {
      this.citiesInLocation = this.locations.map((element) => element);
      this.initializeAllLocations();
      //this.initializeCurrentBatches();
    } else {
      this.locations.forEach((city) => {
        if (city.state === state && this.citiesInLocation.indexOf(city) === -1) {
          this.citiesInLocation.push(city);
        }
      });
      if (this.citiesInLocation.length <= 0) {
        this.selectedLocation = null;
      }
      this.initializeCurrentBatchesFromLocations(this.citiesInLocation);
    }
    //this.showInfo();
  }

  selectStateAndCity(state: string, cityLocation: Location) {
    this.selectedState = state;
    this.citiesInLocation = [];
    if (state === '') {
      this.citiesInLocation = this.locations.map((element) => element);
    } else {
      this.locations.forEach((city) => {
        if (city.state === state && cityLocation.city === city.city && this.citiesInLocation.indexOf(city) === -1) {
          this.citiesInLocation.push(city);
        }
      });
      if (this.citiesInLocation.length > 0) {
      } else {
        this.selectedLocation = null;
      }
    }
    this.initializeCurrentBatchesFromLocations(this.citiesInLocation);
    //this.showInfo();
  }

  selectCity(city: number) {

    if (city != -1) {
      this.selectStateAndCity(this.selectedState, this.citiesInLocation[city]);
    } else {
      //console.log('hit when clciking all cities');
      this.selectState(this.selectedState);
    }
    //this.showInfo();
  }

  initializeAllLocations() {
    this.locationService.getAllLocations().subscribe(
      (locations) => {
        this.locations = locations;
        this.selectedLocation = null;
        if (this.locations.length > 0) {
          this.initializeCurrentBatches();
        }
    });
  }

  initializeCurrentBatches() {
    this.batches = [];
    this.batchService.getAllBatches().subscribe(
      (batches) => {
        const locations = [];
        batches.forEach((batch) => {
          // const currentDateTime = new Date().getTime();
          const currentDateTime = this.currentDateTime;
          const batchDateTime = Number.parseInt(batch.endDate.toString(), 0);
          if ( batchDateTime > currentDateTime) {
            this.batches.push(batch);
            this.locations.forEach(
              (batchLocation) => {
                if (batch.locationId === batchLocation.id) {
                  locations.push(batchLocation);
                }
            });
          }
        });
        this.locations = locations;
        this.setStatesViaLocations();
        this.homeService.setLocationsDataStore(locations);
        this.homeService.setBatchesDataStore(this.batches);
        this.initilaizeAllQANotes(this.batches);
    });
  }

  initializeCurrentBatchesFromLocations(locations: Location[]) {
    this.batches = [];
    this.batchService.getAllBatches().subscribe(
      (batches) => {
        batches.forEach((batch) => {
          const currentDateTime = this.currentDateTime;
          const batchDateTime = Number.parseInt(batch.endDate.toString(), 0);
          if ( batchDateTime > currentDateTime) {
            let added = false;
            locations.forEach(
              (batchLocation) => {
                if (batch.locationId === batchLocation.id && !added) {
                  this.batches.push(batch);
                  added = true;
                }
            });
          }
        });
        this.setStatesViaLocations();
        this.homeService.setLocationsDataStore(this.locations);
        this.homeService.setBatchesDataStore(this.batches);
        this.initilaizeAllQANotes(this.batches);
    });
  }

  initilaizeAllQANotes(batches: Batch[]) {
    this.qaNotesByBatch = [];
    batches.forEach(
      (element) => {
        this.qaNoteService.getAllQANotes(element).subscribe(
          (qaNotesOfBatch) => {
            // let indexOfBatch = batches.indexOf(element);
            const tempBatchArray: QANote[] = [];
            qaNotesOfBatch.forEach(
              (qaNote) => {
              tempBatchArray.push(qaNote);
            });
            this.qaNotesByBatch.push(tempBatchArray);
            this.homeService.setQANotesDataStore(this.qaNotesByBatch);
            this.submitHomeOutput.emit(this.qaNotesByBatch.length);
          });

      });
  }

  setStatesViaLocations() {
    this.states = [];
    this.locations.forEach((element) => {
      if (!this.states.includes(element.state)) {
        this.states.push(element.state);
      }
    });
  }
}

