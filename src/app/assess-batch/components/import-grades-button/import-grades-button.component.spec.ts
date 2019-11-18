import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGradesButtonComponent } from './import-grades-button.component';

describe('ImportGradesButtonComponent', () => {
  let component: ImportGradesButtonComponent;
  let fixture: ComponentFixture<ImportGradesButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportGradesButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGradesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
