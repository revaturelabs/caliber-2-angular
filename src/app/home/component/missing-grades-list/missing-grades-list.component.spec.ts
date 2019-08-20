import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingGradesListComponent } from './missing-grades-list.component';

describe('MissingGradesListComponent', () => {
  let component: MissingGradesListComponent;
  let fixture: ComponentFixture<MissingGradesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingGradesListComponent ]
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
});
