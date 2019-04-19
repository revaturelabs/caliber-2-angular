import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

import { CategoryService } from '../../../Services/category.service';
import { AssessmentService } from '../../../Services/assessment.service';

import { EmitterVisitorContext } from '@angular/compiler';
import { Category } from 'src/app/Assess-Batch/Models/Category';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { updateClassProp } from '@angular/core/src/render3/styling';



@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit{

  @Input() createOrUpdate: Assessment

  @Output() someEvent = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<string>();
  categories: Category[];
  assessment: Assessment;

  currentAssessment: Assessment;
  assessmentId: number = null;
  rawScore: number = null;
  assessmentTitle: string = '';
  assessmentType: string = '';
  weekNumber: number = null;
  batchId: number = null;
  assessmentCategory: number = null;


  assessmentTypeDisplay = [
    {
    name : 'Verbal',
    },
    {
    name: 'Exam',
    },
    {
    name :'Project',
    },
    {
    name : 'Other'
    }
  ] 

  
  
  resetForm() {
     throw new Error("Method not implemented.");
   }
   
  constructor(public categoryService: CategoryService, public assessmentService: AssessmentService) {
  }
  
  addAssessment() : void {
    console.log(new Assessment(this.assessmentId,this.rawScore,
      this.assessmentTitle,this.assessmentType,this.weekNumber,
      this.batchId,this.assessmentCategory));
    this.assessmentService.createCategories(new Assessment(this.assessmentId,this.rawScore,
      this.assessmentTitle,this.assessmentType,this.weekNumber,
      this.batchId,this.assessmentCategory)).subscribe(result=>{
      this.assessment = result;
      console.log(result);
    })
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



