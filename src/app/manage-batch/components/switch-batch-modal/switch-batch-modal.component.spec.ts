import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBatchModalComponent } from './switch-batch-modal.component';

describe('SwitchBatchModalComponent', () => {
  let component: SwitchBatchModalComponent;
  let fixture: ComponentFixture<SwitchBatchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchBatchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
