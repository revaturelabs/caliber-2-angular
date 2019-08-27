import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeModule } from 'src/app/home-module/home-module.module';
import { DebugElement } from '@angular/core';

import { MissingGradesListComponent } from './missing-grades-list.component';
import { PillBoxComponent } from '../pills/pill-box/pill-box.component';
import { element } from '@angular/core/src/render3/instructions';

describe('MissingGradesListComponent', () => {
  let component: MissingGradesListComponent;
  let fixture: ComponentFixture<MissingGradesListComponent>;
  let de : DebugElement;
  let pillBox : PillBoxComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers : [MissingGradesListComponent],
      imports: [HomeModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingGradesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it("number of current batches with missing grades", () => {
    component.getMissingGradesFromActiveBatches(); 
  });

  it('should have an app-pill-box tag', () => {
    const element : HTMLElement = fixture.nativeElement;
    expect(element.querySelector("#pill-box"));
  });
});
