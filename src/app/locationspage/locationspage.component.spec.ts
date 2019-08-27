import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationspageComponent } from './locationspage.component';
import { LocationsModule } from '../locations-module/locations-module.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocationsRoutingService } from '../locations-module/locations-routing.service';
import { FormsModule } from '@angular/forms';
import { Location } from '../home/models/location';

fdescribe('LocationspageComponent', () => {
  let component: LocationspageComponent;
  let fixture: ComponentFixture<LocationspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        CommonModule,
        HttpClientModule,
        LocationsRoutingService,
        FormsModule, 
        LocationsModule
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
