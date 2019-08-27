import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from "../../home/models/location";

@Component({
  selector: 'app-disable-location-modal',
  templateUrl: './disable-location-modal.component.html',
  styleUrls: ['./disable-location-modal.component.css']
})
export class DisableLocationModalComponent implements OnInit {

  location: Location;
  buttonValue:string;
  buttonValueReactive: string="Reactivate";
  buttonValueDeactive: string="Deactivate";

  @Output() activationEmit: EventEmitter<Location>= new EventEmitter<Location>();

  constructor() { }

  ngOnInit() {
    this.location=new Location();
  }

  /*@ngdoc The initial call parameter for the modal, the location object is passed in from the locationpage parent component and the modal is given a member variable reference of that object for use in the functions. Changes the button test dynamically based the current active status of the location being edited.*/
  displayDisableModal(location: Location){
    this.location=location;
    if(this.location.active){
      this.buttonValue=this.buttonValueDeactive;
    }
    else{
      this.buttonValue=this.buttonValueReactive;
    }
  }

  //Command sends the selected locations information upward to the locationspage component to be persisted in the database via the locationservice method. Toggles the value of active with the passed in location such that its apathetic to if its true or false.
  updateLocation(){
    this.location.active=!this.location.active;
    this.activationEmit.emit(this.location);
  }

}
