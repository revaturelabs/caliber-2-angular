import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateNotesComponent } from './associate-notes.component';

describe('AssociateNotesComponent', () => {
  let component: AssociateNotesComponent;
  let fixture: ComponentFixture<AssociateNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
