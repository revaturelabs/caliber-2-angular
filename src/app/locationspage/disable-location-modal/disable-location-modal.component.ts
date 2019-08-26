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

  displayDisableModal(location: Location){
    console.log('Hitting the modal');
    this.location=location;
    if(this.location.active){
      this.buttonValue=this.buttonValueDeactive;
    }
    else{
      this.buttonValue=this.buttonValueReactive;
    }
  }

  updateLocation(){
    this.location.active=!this.location.active;
    this.activationEmit.emit(this.location);
  }

}
