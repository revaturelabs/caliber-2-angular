import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ChildActivationEnd } from '@angular/router';
@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css'],
  exportAs: 'child'
})
export class BatchModalComponent implements OnInit{

  
  // resetForm() {
  //   throw new Error("Method not implemented.");
  // }
  constructor(public activeModal: NgbActiveModal, public batchModal: NgbModal) {
  }
  closeModal(){
    this.activeModal.close('Modal Closed');
  }



  @ViewChild('createAssessmentModal')
  modal: BatchModalComponent;
  open(){
    
  }
  ngOnInit(){
    // this.modal.open();
    // this.open();
    // this.batchModal.open();
  
  }

  
  //  void {
  //   throw new Error("Method not FACE implemented.");
  
}



