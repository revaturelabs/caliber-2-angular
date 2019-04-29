import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessBatchComponent } from './assess-batch.component';

describe('AssessBatchComponent', () => {
  let component: AssessBatchComponent;
  let fixture: ComponentFixture<AssessBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
