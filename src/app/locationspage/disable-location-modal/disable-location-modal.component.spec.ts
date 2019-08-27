import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableLocationModalComponent } from './disable-location-modal.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocationsRoutingService } from 'src/app/locations-module/locations-routing.service';
import { FormsModule } from '@angular/forms';
import { LocationsModule } from 'src/app/locations-module/locations-module.module';

fdescribe('DisableLocationModalComponent', () => {
  let component: DisableLocationModalComponent;
  let fixture: ComponentFixture<DisableLocationModalComponent>;

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
    fixture = TestBed.createComponent(DisableLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle activate function on click', () => {
    expect(component);
  });

});
