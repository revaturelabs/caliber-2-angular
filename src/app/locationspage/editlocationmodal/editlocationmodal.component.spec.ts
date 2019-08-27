import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlocationmodalComponent } from './editlocationmodal.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocationsRoutingService } from 'src/app/locations-module/locations-routing.service';
import { FormsModule } from '@angular/forms';
import { LocationsModule } from 'src/app/locations-module/locations-module.module';

fdescribe('EditlocationmodalComponent', () => {
  let component: EditlocationmodalComponent;
  let fixture: ComponentFixture<EditlocationmodalComponent>;

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
    fixture = TestBed.createComponent(EditlocationmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
