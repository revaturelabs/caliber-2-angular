import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

import { CategoryService } from '../../../Services/category.service';
import { AssessmentService } from '../../../Services/assessment.service';
import { ToolbarComponent } from '../toolbar.component';
import { EmitterVisitorContext } from '@angular/compiler';
import { Category } from 'src/app/Assess-Batch/Models/Category';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { updateClassProp } from '@angular/core/src/render3/styling';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service';



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
  assessmentId: number = 4;
  rawScore: number = null;
  assessmentTitle: string = '';
  assessmentType: string = '';
  weekNumber: number = null;
  batchId: number = null;
  assessmentCategory: number = null;
  score: number = null;

  selectedType = "default";
  selectedCategory = "default";
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
    this.selectedType = "default";
    this.selectedCategory = "default";
    this.score = null;
    }
   
  constructor(public assessBatchGradeService: AssessBatchGradeService, public categoryService: CategoryService, public assessmentService: AssessmentService, public toolBar: ToolbarComponent) {
  }
  
  addAssessment(rawScore, assessmentType, categoryNumber) : void {

    
      this.assessmentService.createCategories(new Assessment(this.assessmentId,rawScore,
      this.assessmentTitle,assessmentType,this.toolBar.selectedWeek,
      this.toolBar.selectedBatch.batchId,categoryNumber)).subscribe(result=>{
      this.assessment = result;

      this.assessBatchGradeService.getAssessmentsByBatchIdAndWeekNum(result.batchId, result.weekNumber).subscribe(assessments => {
        
        this.assessBatchGradeService.storeAssessments(assessments);
        this.assessBatchGradeService.assessments.emit(assessments);
        this.assessBatchGradeService.getGradesByBatchIdAndWeekNum(this.toolBar.selectedWeek, this.toolBar.selectedBatch.batchId).subscribe(grades => {
  
          this.assessBatchGradeService.storeGrades(grades);
          this.assessBatchGradeService.grades.emit(grades);
        })
      })
    })
    this.resetForm();
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



