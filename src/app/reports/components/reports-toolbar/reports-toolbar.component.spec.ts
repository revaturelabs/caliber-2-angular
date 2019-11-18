import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsToolbarComponent } from './reports-toolbar.component';

describe('ReportsToolbarComponent', () => {
  let component: ReportsToolbarComponent;
  let fixture: ComponentFixture<ReportsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
