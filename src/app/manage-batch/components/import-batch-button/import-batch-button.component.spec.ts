import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBatchButtonComponent } from './import-batch-button.component';

describe('ImportBatchButtonComponent', () => {
  let component: ImportBatchButtonComponent;
  let fixture: ComponentFixture<ImportBatchButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportBatchButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBatchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
