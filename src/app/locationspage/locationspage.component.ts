import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '../home/models/location';
import { LocationService } from '../home/service/location.service';
import { AddlocationmodalComponent } from './addlocationmodal/addlocationmodal.component';
import { EditlocationmodalComponent } from './editlocationmodal/editlocationmodal.component';
import { DisableLocationModalComponent } from './disable-location-modal/disable-location-modal.component';

@Component({
  selector: 'app-locationspage',
  templateUrl: './locationspage.component.html',
  styleUrls: ['./locationspage.component.css']
})
export class LocationspageComponent implements OnInit {

  @ViewChild('addLocationModal') AddLocation: AddlocationmodalComponent;
  @ViewChild('editLocationModal') EditLocation: EditlocationmodalComponent;
  @ViewChild('disableLocationModal') DisableLocation: DisableLocationModalComponent;

  locations:Location[];

  constructor(private locationService:LocationService ) { }

  ngOnInit() 
  {
    //this.locations = Array<Location>();
    this.getAlLocations();
  }

  getAlLocations(){
    this.locationService.getAllLocations().subscribe(data => {this.locations = data});
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
    this.locationService.addLocation(location).subscribe(location => {
      this.getAlLocations();
    });
  }

  clearView(){
    this.locations=[];
  }
}
