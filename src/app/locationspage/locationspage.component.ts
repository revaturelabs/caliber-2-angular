import { Component, OnInit } from '@angular/core';
import { Location } from '../home/models/location';
import { LocationService } from '../home/service/location.service';

@Component({
  selector: 'app-locationspage',
  templateUrl: './locationspage.component.html',
  styleUrls: ['./locationspage.component.css']
})
export class LocationspageComponent implements OnInit {

  locations:Location[];

  constructor(private locationService:LocationService) { }

  ngOnInit() 
  {
    this.locationService.getAllLocations().subscribe(data => {this.locations = data; console.log(this.locations)});
  }

}
