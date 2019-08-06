import { Component, OnInit } from '@angular/core';
import { AssessCategoryService } from '../../Services/assess-category.service';
import {AssessCategory} from '../../Models/assess-category'


@Component({
  selector: 'app-add-assess-cat-modal',
  templateUrl: './add-assess-cat-modal.component.html',
  styleUrls: ['./add-assess-cat-modal.component.css']
})
export class AddAssessCatModalComponent implements OnInit {


 category: AssessCategory = new AssessCategory();
 errorMessage:string;
 successMessage:string;
 displayResultError:boolean;
 displayResultSuccess:boolean;
  constructor(private categoryService: AssessCategoryService) { }

  ngOnInit() {
  }

  clearModal(){
    this.displayResultSuccess = false;
    this.displayResultError = false;
    this.category.skillCategory = ''
  }
  
  addCategory(){
    this.category.categoryOwner = localStorage.getItem("id");
    this.category.active = true;
    this.categoryService.addCategory(this.category).subscribe ( (res)=>{
      if( res != null){
      let myJSON = JSON.stringify(res);
      let result = JSON.parse(myJSON);
      this.displayResultSuccess = true;
      this.successMessage = result.skillCategory + " has been successfully created";
     
    }
  }, (err)=>{
    this.displayResultError = true;
      
    this.errorMessage = err.error.message;
  });
    this.displayResultError = false;
    this.displayResultSuccess = false;
    this.category.skillCategory = ''
  }

  
 
}
