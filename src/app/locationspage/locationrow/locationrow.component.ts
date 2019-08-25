import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/home/models/location';

@Component({
  selector: '[app-locationrow]',
  templateUrl: './locationrow.component.html',
  styleUrls: ['./locationrow.component.css']
})


export class LocationrowComponent implements OnInit {
  
  @Input() location:Location;

  constructor() { }

  ngOnInit() 
  {

  }

}
