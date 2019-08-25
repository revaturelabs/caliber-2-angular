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

  @ViewChildren('addLocationModal') AddLocation: AddlocationmodalComponent;
  @ViewChild('editLocationModal') EditLocation: EditlocationmodalComponent;
  @ViewChild('disableLocationModal') DisableLocation: DisableLocationModalComponent;

  locations:Location[];

  constructor(private locationService:LocationService, ) { }

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
    
  }

  updateTable(location: Location){
    this.locationService.updateLocation(location).subscribe(location => {
      this.getAlLocations();
    });
  }

  clearView(){
    this.locations=[];
  }
}
