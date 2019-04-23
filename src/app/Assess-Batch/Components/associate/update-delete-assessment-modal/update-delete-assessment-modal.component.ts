import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { AssessmentService } from '../../../Services/assessment.service';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { Assessment } from '../../../Models/Assesment';
import { AssociateComponent } from '../../associate/associate.component';
import { CategoryService } from '../../../Services/category.service';
import { Category } from 'src/app/Assess-Batch/Models/Category';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-update-delete-assessment-modal',
  templateUrl: './update-delete-assessment-modal.component.html',
  styleUrls: ['./update-delete-assessment-modal.component.css']
})
export class UpdateDeleteAssessmentModalComponent implements OnInit{
  // @Input() createOrUpdate: Category

  // @Output() closeEvent = new EventEmitter<string>();
  // @Output() someEvent = new EventEmitter<string>();

  categories: Category[];
  currentCategory: Category;
  currentAssessment : Assessment;
  currentCatId: number;
  currentAssessmentId: number = null;
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
  
  constructor(public assessmentSerivce: AssessmentService, public associate: AssociateComponent,public categoryService: CategoryService) { }


  editAssessment(score,type,category) :void{
    console.log(new Assessment(this.currentAssessment.assessmentId, score, 
      this.currentAssessment.assessmentTitle, type, this.currentAssessment.weekNumber, 
      this.currentAssessment.batchId, category));
    this.assessmentSerivce.updateAssessment(new Assessment(this.currentAssessment.assessmentId, score, 
      this.currentAssessment.assessmentTitle, type, this.currentAssessment.weekNumber, 
      this.currentAssessment.batchId, category)).subscribe(result=>{
        this.currentAssessment = result;
      })
    console.log("working")
  }
  deleteAssessment():void{
    
      this.assessmentSerivce.deleteAssessment(this.currentAssessment).subscribe(result=>{
        this.currentAssessment =result;
      })
        
  }

  getCategory(catId){
    this.categoryService.getCategoryById(catId).subscribe(result =>{
      this.currentCategory = result;
      console.log(this.currentCategory)

      
    })
  }

  getAssessmentById(assesId): void {
    this.assessmentSerivce.getAssessment(assesId).subscribe(result =>{
      this.currentAssessment = result;
      console.log(this.currentAssessment);

    })
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
    console.log(this.associate.selectedAssessmentId);
    
  }
 

}
