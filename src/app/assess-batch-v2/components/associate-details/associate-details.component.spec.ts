import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateDetailsComponent } from './associate-details.component';

describe('AssociateDetailsComponent', () => {
  let component: AssociateDetailsComponent;
  let fixture: ComponentFixture<AssociateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
