import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGradesDialogComponent } from './import-grades-dialog.component';

describe('ImportGradesDialogComponent', () => {
  let component: ImportGradesDialogComponent;
  let fixture: ComponentFixture<ImportGradesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportGradesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGradesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
