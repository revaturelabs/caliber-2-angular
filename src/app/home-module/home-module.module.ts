import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.service';
import { HomeComponent } from '../home/home.component';
import { LastQualityAuditTableComponent } from '../home/component/last-quality-audit-table/last-quality-audit-table.component';
import { HomeToolbarComponent } from '../home/component/home-toolbar/home-toolbar.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule
  ],
  declarations: [
    HomeComponent,
    LastQualityAuditTableComponent,
    HomeToolbarComponent
  ],
})
export class HomeModule { }
