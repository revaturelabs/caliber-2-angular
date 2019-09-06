import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessBatchConatinerComponent } from './assess-batch-conatiner.component';

describe('AssessBatchConatinerComponent', () => {
  let component: AssessBatchConatinerComponent;
  let fixture: ComponentFixture<AssessBatchConatinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessBatchConatinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessBatchConatinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
