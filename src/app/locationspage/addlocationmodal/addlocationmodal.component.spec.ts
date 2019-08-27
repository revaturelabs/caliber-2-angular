import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlocationmodalComponent } from './addlocationmodal.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocationsRoutingService } from 'src/app/locations-module/locations-routing.service';
import { FormsModule } from '@angular/forms';
import { LocationsModule } from 'src/app/locations-module/locations-module.module';

fdescribe('AddlocationmodalComponent', () => {
  let component: AddlocationmodalComponent;
  let fixture: ComponentFixture<AddlocationmodalComponent>;

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
    fixture = TestBed.createComponent(AddlocationmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
