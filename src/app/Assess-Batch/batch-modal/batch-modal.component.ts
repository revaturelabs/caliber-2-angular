import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit{

  
  // resetForm() {
  //   throw new Error("Method not implemented.");
  // }
  constructor(public activeModal: NgbActiveModal) {
  }
  closeModal(){
    this.activeModal.close('Modal Closed');
  }


  // @ViewChild('modal')
  // modal: BatchModalComponent;
  // open(){
    
  // }
  ngOnInit(){
    // this.modal.open();
    // this.open();
  }
  
  

  
  //  void {
  //   throw new Error("Method not FACE implemented.");
  
}



