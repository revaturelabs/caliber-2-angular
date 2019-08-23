import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocationsRoutingService } from './locations-routing.service';
import { LocationspageComponent } from '../locationspage/locationspage.component';

@NgModule({
  declarations: [
    LocationspageComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LocationsRoutingService
  ]
})
export class LocationsModule { }
