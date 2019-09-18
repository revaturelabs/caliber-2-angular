import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSelectDropdownComponent } from './batch-select-dropdown.component';

describe('BatchSelectDropdownComponent', () => {
  let component: BatchSelectDropdownComponent;
  let fixture: ComponentFixture<BatchSelectDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchSelectDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
