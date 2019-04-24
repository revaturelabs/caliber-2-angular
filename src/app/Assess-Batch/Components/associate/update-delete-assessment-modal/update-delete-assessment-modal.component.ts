import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AssessmentService } from '../../../Services/assessment.service';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { Assessment } from '../../../Models/Assesment';
import { CategoryService } from '../../../Services/category.service';
import { Category } from 'src/app/Assess-Batch/Models/Category';

import { traineeAssessment } from 'src/app/User/user/types/trainee';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service';

@Component({
  selector: 'app-update-delete-assessment-modal',
  templateUrl: './update-delete-assessment-modal.component.html',
  styleUrls: ['./update-delete-assessment-modal.component.css']
})
export class UpdateDeleteAssessmentModalComponent implements OnInit{
  
  @Output() emitAssess = new EventEmitter();
  categories: Category[];
  currentCategory: Category;
  currentAssessment : Assessment;
  tempId: number = 0;
  currentCatId: number;
  currentAssessmentId: number = null;
  selectedType = "default";
  selectedCategory = "default";
  score = undefined;
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

  resetForm(){
    this.selectedType = "default";
    this.selectedCategory = "default";
    this.score = this.currentAssessment.rawScore;
  }
  
  constructor(public assessmentSerivce: AssessmentService,  public assessBatchGradeService: AssessBatchGradeService,public categoryService: CategoryService) { }

  editAssessment(score,type,category) :void{
    if(score !== undefined){
      this.currentAssessment.rawScore = score
    }
    if(type !== "default"){
      this.currentAssessment.assessmentType = type
    }
    if(category !== "default"){
      this.currentAssessment.assessmentCategory = category
    }
    console.log(new Assessment(this.currentAssessment.assessmentId, this.currentAssessment.rawScore, 
      this.currentAssessment.assessmentTitle, this.currentAssessment.assessmentType, this.currentAssessment.weekNumber, 
      this.currentAssessment.batchId, this.currentAssessment.assessmentCategory));
    this.assessmentSerivce.updateAssessment(new Assessment(this.currentAssessment.assessmentId, this.currentAssessment.rawScore, 
      this.currentAssessment.assessmentTitle, this.currentAssessment.assessmentType, this.currentAssessment.weekNumber, 
      this.currentAssessment.batchId, this.currentAssessment.assessmentCategory)).subscribe(result=>{
        this.currentAssessment = result;
        this.refreshPage();
      });
    console.log("working")
  }

  deleteAssessment():void{
    
      this.assessmentSerivce.deleteAssessment(this.currentAssessment).subscribe(result=>{
        this.refreshPage();
      });
  }

  refreshPage(){
    this.assessBatchGradeService.getAssessmentsByBatchIdAndWeekNum(this.assessmentSerivce.assessment.batchId, this.assessmentSerivce.assessment.weekNumber).subscribe(assessments => {
    
      this.assessBatchGradeService.storeAssessments(assessments);
      this.assessBatchGradeService.assessments.emit(assessments);
      this.assessBatchGradeService.getGradesByBatchIdAndWeekNum(this.assessmentSerivce.assessment.batchId, this.assessmentSerivce.assessment.weekNumber).subscribe(grades => {

        this.assessBatchGradeService.storeGrades(grades);
        this.assessBatchGradeService.grades.emit(grades);
      })
    })
  }

  getCategory(catId){
    this.categoryService.getCategoryById(catId).subscribe(result =>{
      this.currentCategory = result;
      console.log(this.currentCategory);
    })
  }

  getAssessmentById(assesId): void{
    this.assessmentSerivce.getAssessment(assesId).subscribe(result =>{
      this.currentAssessment = result;
      console.log(this.currentAssessment.assessmentId);
      this.holdId(this.currentAssessment.batchId);
    });
  }

  holdId(batchId){
    this.tempId = batchId;
    console.log(this.tempId);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(result=>{
      this.categories = result;
      // this.someEvent.next('get')
      console.log(result);
    })
  }
  ngOnInit() {
    this.assessmentSerivce.currentCategoryId.subscribe((currentCatId)=>{
      this.currentCatId = currentCatId;
      this.getCategory(currentCatId);
      console.log(currentCatId);
    })
   this.assessmentSerivce.currentAssessmentId.subscribe((currentAssessmentId)=>{
     this.currentAssessmentId = currentAssessmentId;
     this.getAssessmentById(this.currentAssessmentId);
   })
    this.getCategories();
    this.getCategory(this.currentCatId);
    console.log(this.currentAssessment);
    console.log(this.currentCategory);
    
  }
 

}
