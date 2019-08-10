import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalComponent } from './form-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('FormModalComponent', () => {
  let component: FormModalComponent;
  let fixture: ComponentFixture<FormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormModalComponent],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(FormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    spyOn(component.activeModal, 'close');
    component.closeModal();
    expect(component.activeModal.close).toHaveBeenCalled();
    expect(component.activeModal.close).toHaveBeenCalledWith('madal Closed');
  });

});
