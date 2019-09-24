import { Component, OnInit } from '@angular/core';
import { AssessCategoryService } from '../../Services/assess-category.service';
import { CategoriesComponent } from '../../Components/categories/categories.component';
import {Category} from "../../../domain/model/category.dto";
import {CategoryService} from "../../../services/subvertical/category/category.service";


@Component({
  selector: 'app-add-assess-cat-modal',
  templateUrl: './add-assess-cat-modal.component.html',
  styleUrls: ['./add-assess-cat-modal.component.css']
})
export class AddAssessCatModalComponent implements OnInit {


 category: Category = new Category(0, "", "", false);
 errorMessage:string;
 successMessage:string;
 displayResultError:boolean;
 displayResultSuccess:boolean;
  constructor(private categoryService: CategoryService, private catComponent:CategoriesComponent) { }

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
    this.category.categoryId = 0;
    this.categoryService.addCategory(this.category).subscribe ( (result: Category)=>{
      if(result){
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

  updateComponent(){
    this.catComponent.getAllCategories();
  }

}
