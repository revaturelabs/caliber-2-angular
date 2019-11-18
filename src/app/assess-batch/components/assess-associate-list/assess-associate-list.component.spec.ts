import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessAssociateListComponent } from './assess-associate-list.component';

describe('AssessAssociateListComponent', () => {
  let component: AssessAssociateListComponent;
  let fixture: ComponentFixture<AssessAssociateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessAssociateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessAssociateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
