import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PillBoxComponent } from './pill-box.component';

describe('PillBoxComponent', () => {
  let component: PillBoxComponent;
  let fixture: ComponentFixture<PillBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PillBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PillBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
