import { Component, OnInit, Input } from '@angular/core';
import { CategoriesComponent } from '../../Components/categories/categories.component';
import {Category} from "../../../domain/model/category.dto";
import {CategoryService} from "../../../services/subvertical/category/category.service";

@Component({
  selector: 'app-edit-assess-cat-modal',
  templateUrl: './edit-assess-cat-modal.component.html',
  styleUrls: ['./edit-assess-cat-modal.component.css']
})
export class EditAssessCatModalComponent implements OnInit {

  category:Category;  //The category that will be selected for presentation and editing
  @Input() categories:Category []; //The list of categories to be loaded and displayed
  errorMessage:string;
  successMessage:string;
  displayResultError:boolean;
  displayResultSuccess:boolean;
  temp:string;
  tempOwner:any;

  constructor(private categoryService:CategoryService, private catComponent:CategoriesComponent) {

  }

  ngOnInit() {
    this.getAll();
  }

  //sets the selected category as the local category to be edited
  selected(cat){
    const found = this.categories.find(x => x.skillCategory === cat)
    if (found) {
      this.category = found;
      // this.temp = cat.skillCategory;
      // this.tempOwner = cat.categoryOwner;
      console.log(this.category, this.temp, this.tempOwner);
    }
  }

  //gets the categories from the database and inserts them into the category list
  getAll(){
    this.categoryService.getAllCategories().subscribe((res)=>{
      var c = JSON.parse(JSON.stringify(res));

      this.categories = c;
    });
  }


  //saves the changes made to the category into the database
  save(){
    this.category.skillCategory = this.temp;
    this.category.categoryOwner = this.tempOwner;
    this.categoryService.update(this.category).subscribe((res)=>{
      if(res != null){
        let myJSON = JSON.stringify(res);
        let result = JSON.parse(myJSON);

        this.displayResultSuccess = true;
        this.successMessage = result.skillCategory + " has been successfully updated";
      }
    },(err)=>{
      this.displayResultError = true;
      this.errorMessage = err.error.message;
    });
    this.displayResultSuccess = false;
    this.displayResultError = false;
  }

  clearModal(){
    this.displayResultSuccess = false;
    this.displayResultError = false;
    this.temp = '';
    this.tempOwner = '';
  }

  updateComponent(){
    this.catComponent.getAllCategories();
  }
}
