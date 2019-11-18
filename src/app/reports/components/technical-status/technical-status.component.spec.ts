import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalStatusComponent } from './technical-status.component';

describe('TechnicalStatusComponent', () => {
  let component: TechnicalStatusComponent;
  let fixture: ComponentFixture<TechnicalStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
