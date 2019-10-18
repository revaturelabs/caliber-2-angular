import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBatchDialogComponent } from './import-batch-dialog.component';

describe('ImportBatchDialogComponent', () => {
  let component: ImportBatchDialogComponent;
  let fixture: ComponentFixture<ImportBatchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportBatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
