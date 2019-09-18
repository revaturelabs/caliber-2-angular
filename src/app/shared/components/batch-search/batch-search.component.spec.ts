import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSearchComponent } from './batch-search.component';

describe('BatchSearchComponent', () => {
  let component: BatchSearchComponent;
  let fixture: ComponentFixture<BatchSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
