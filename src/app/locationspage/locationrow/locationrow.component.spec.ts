import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationrowComponent } from './locationrow.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocationsRoutingService } from 'src/app/locations-module/locations-routing.service';
import { FormsModule } from '@angular/forms';
import { LocationsModule } from 'src/app/locations-module/locations-module.module';

fdescribe('LocationrowComponent', () => {
  let component: LocationrowComponent;
  let fixture: ComponentFixture<LocationrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
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
    fixture = TestBed.createComponent(LocationrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fail because it is impossible for it to instantiate without a reference to a location via injection', () => {
    if(component.location != undefined)
    {
      expect(component).toBeTruthy();
    }
    else
    {
      expect(component).toBeFalsy();
    }
  });
});
