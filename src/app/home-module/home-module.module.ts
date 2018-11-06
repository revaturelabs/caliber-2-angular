import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.service';
import { HomeComponent } from '../home/home.component';



@NgModule({
  imports: [
    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
