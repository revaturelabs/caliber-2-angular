import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBatchActionsComponent } from './manage-batch-actions.component';

describe('ManageBatchActionsComponent', () => {
  let component: ManageBatchActionsComponent;
  let fixture: ComponentFixture<ManageBatchActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBatchActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBatchActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
