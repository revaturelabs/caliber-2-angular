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
export class UpdateDeleteAssessmentModalComponent implements OnInit, OnChanges {
  // @Input() createOrUpdate: Category

  // @Output() closeEvent = new EventEmitter<string>();
  // @Output() someEvent = new EventEmitter<string>();

  categories: Category[];
  currentCategory: Category;
  currentAssessment : Assessment;
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

  getCategory(catId){
    this.categoryService.getCategoryById(this.currentAssessment.assessmentCategory).subscribe(result =>{
      this.currentCategory = result;
      console.log(this.currentCategory)

      
    })
  }

  getAssessmentById(): void {
    this.assessmentSerivce.getAssessment(this.associate.selectedAssessmentId).subscribe(result =>{
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
    this.getCategories();
    this.getCategory(4);
    console.log(this.currentAssessment);
    console.log(this.currentCategory);
    console.log(this.associate.selectedAssessmentId);
  }
  ngOnChanges(){
    console.log(this.currentCategory)
    this.getAssessmentById();
  }

}
