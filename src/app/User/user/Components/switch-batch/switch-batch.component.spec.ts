import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBatchComponent } from './switch-batch.component';

describe('SwitchBatchComponent', () => {
  let component: SwitchBatchComponent;
  let fixture: ComponentFixture<SwitchBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
