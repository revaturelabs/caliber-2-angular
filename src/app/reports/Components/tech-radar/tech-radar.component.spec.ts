import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechRadarComponent } from './tech-radar.component';

describe('TechRadarComponent', () => {
  let component: TechRadarComponent;
  let fixture: ComponentFixture<TechRadarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechRadarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
