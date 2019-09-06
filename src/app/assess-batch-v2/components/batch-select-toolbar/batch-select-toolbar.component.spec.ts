import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSelectToolbarComponent } from './batch-select-toolbar.component';

describe('BatchSelectToolbarComponent', () => {
  let component: BatchSelectToolbarComponent;
  let fixture: ComponentFixture<BatchSelectToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchSelectToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchSelectToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
