import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBatchContainerComponent } from './manage-batch-container.component';

describe('ManageBatchContainerComponent', () => {
  let component: ManageBatchContainerComponent;
  let fixture: ComponentFixture<ManageBatchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBatchContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBatchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
