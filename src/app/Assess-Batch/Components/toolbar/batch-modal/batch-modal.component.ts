import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

import { CategoryService } from '../../../Services/category.service';

import { EmitterVisitorContext } from '@angular/compiler';
import { Category } from 'src/app/Assess-Batch/Models/Category';

@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit{

  @Output() someEvent = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<string>();
  categories: Category[];
  

  
  resetForm() {
     throw new Error("Method not implemented.");
   }
   
  constructor(public categoryService: CategoryService) {
  }
  
  getCategories(){
    this.categoryService.getCategories().subscribe(result=>{
      this.categories = result;
      // this.someEvent.next('get')
      console.log(result);
    })
  }

  ngOnInit(){
    console.log('Init');
    this.getCategories();
  }
  
}



