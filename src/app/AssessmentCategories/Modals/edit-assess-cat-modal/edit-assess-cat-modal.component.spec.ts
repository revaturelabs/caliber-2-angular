import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssessCatModalComponent } from './edit-assess-cat-modal.component';

describe('EditAssessCatModalComponent', () => {
  let component: EditAssessCatModalComponent;
  let fixture: ComponentFixture<EditAssessCatModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssessCatModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssessCatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
