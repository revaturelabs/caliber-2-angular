import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchOverallTechnologyCapabilityComponent } from './batch-overall-technology-capability.component';

describe('BatchOverallTechnologyCapabilityComponent', () => {
  let component: BatchOverallTechnologyCapabilityComponent;
  let fixture: ComponentFixture<BatchOverallTechnologyCapabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchOverallTechnologyCapabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchOverallTechnologyCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
