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
import { AssessBatchService } from 'src/app/Assess-Batch/Services/assess-batch.service';
import { TraineeService } from 'src/app/Assess-Batch/Services/trainee.service';
import { Grade } from 'src/app/Batch/type/trainee';


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

  //Resets the form within the modal.
  resetForm() {
    this.selectedType = "default";
    this.selectedCategory = "default";
    this.score = null;
    }
   
  constructor(public traineeService: TraineeService, public assessBatchGradeService: AssessBatchGradeService, public categoryService: CategoryService, public assessmentService: AssessmentService, public toolBar: ToolbarComponent) {
  }
  
  //This function runs when user clicks create within the create assessment modal.
  addAssessment(rawScore, assessmentType, categoryNumber) : void {
      this.assessmentService.createCategories(new Assessment(this.assessmentId,rawScore,
      this.assessmentTitle,assessmentType,this.toolBar.selectedWeek,
      this.toolBar.selectedBatch.batchId,categoryNumber)).subscribe(result=>{
      this.assessment = result;
      
      //Populating an empty grade to be made for every trainee that exists in the batch
      this.traineeService.getTraineesByBatchId(this.toolBar.selectedBatch.batchId).subscribe((batch) => {
        for(let b of batch){
          let g: Grade = {
            gradeId: 0,
            dateReceived: 0,
            score: 0,
            assessmentId: result.assessmentId,
            traineeId: b.traineeId
          }
          this.assessBatchGradeService.postGrade(g).subscribe((postGrade) => {
          })
        }
      this.assessBatchGradeService.getAssessmentsByBatchIdAndWeekNum(result.batchId, result.weekNumber).subscribe(assessments => {
        this.assessBatchGradeService.storeAssessments(assessments);
        this.assessBatchGradeService.assessments.emit(assessments);
        this.assessBatchGradeService.getGradesByBatchIdAndWeekNum(result.batchId, result.weekNumber).subscribe(grades => {
          this.assessBatchGradeService.storeGrades(grades);
          this.assessBatchGradeService.grades.emit(grades);
        });
      });
    });
    });
    this.resetForm();
  }

  //Grabs all categories
  getCategories(){
    this.categoryService.getCategories().subscribe(result=>{
      this.categories = result;
      // this.someEvent.next('get')
    })
  }

  ngOnInit(){
    this.getCategories();
    
  }
  
}



