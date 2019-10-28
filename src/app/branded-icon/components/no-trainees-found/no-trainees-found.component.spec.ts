import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTraineesFoundComponent } from './no-trainees-found.component';

describe('NoTraineesFoundComponent', () => {
  let component: NoTraineesFoundComponent;
  let fixture: ComponentFixture<NoTraineesFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoTraineesFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoTraineesFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
