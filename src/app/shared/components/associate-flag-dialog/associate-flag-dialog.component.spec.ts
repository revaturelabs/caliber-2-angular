import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateFlagDialogComponent } from './associate-flag-dialog.component';

describe('AssociateFlagDialogComponent', () => {
  let component: AssociateFlagDialogComponent;
  let fixture: ComponentFixture<AssociateFlagDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateFlagDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateFlagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
