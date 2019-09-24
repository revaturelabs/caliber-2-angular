import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBatchToolbarComponent } from './manage-batch-toolbar.component';

describe('ManageBatchToolbarComponent', () => {
  let component: ManageBatchToolbarComponent;
  let fixture: ComponentFixture<ManageBatchToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBatchToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBatchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
