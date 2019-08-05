import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssessCatModalComponent } from './add-assess-cat-modal.component';

describe('AddAssessCatModalComponent', () => {
  let component: AddAssessCatModalComponent;
  let fixture: ComponentFixture<AddAssessCatModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssessCatModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssessCatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
