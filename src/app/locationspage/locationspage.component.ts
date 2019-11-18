import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { LocationService } from '../services/subvertical/location/location.service';
import { AddlocationmodalComponent } from './addlocationmodal/addlocationmodal.component';
import { EditlocationmodalComponent } from './editlocationmodal/editlocationmodal.component';
import { DisableLocationModalComponent } from './disable-location-modal/disable-location-modal.component';
import {Location} from "../domain/model/location.dto";

@Component({
  selector: 'app-locationspage',
  templateUrl: './locationspage.component.html',
  styleUrls: ['./locationspage.component.css']
})
export class LocationspageComponent implements OnInit {

  @ViewChild('addLocationModal') AddLocation: AddlocationmodalComponent;
  @ViewChild('editLocationModal') EditLocation: EditlocationmodalComponent;
  @ViewChild('disableLocationModal') DisableLocation: DisableLocationModalComponent;

  locations: Location[]

  constructor(private locationService:LocationService ) { }

  ngOnInit()
  {
    this.getAlLocations();
  }

  getAlLocations(){
    this.locationService.getAllLocations().subscribe(data => {this.locations = data; console.log(this.locations)});
  }

  displayLocationEditModal(location: Location){
    this.EditLocation.displayEditModal(location);
  }

  displayLocationDisableModal(location: Location){
    this.DisableLocation.displayDisableModal(location);
  }

  displayAddLocationModal(){
    this.AddLocation.displayAddModal();
  }

  updateTable(location: Location){
    this.locationService.updateLocation(location).subscribe(location => {
      this.getAlLocations();
    });
  }

  addToTable(location: Location){
    this.locationService.createLocation(location).subscribe(location => {
      this.getAlLocations();
    });
  }

  clearView(){
    this.locations=[];
  }
}
