import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/AssessCategories/Services/category-service';
import { Category } from 'src/app/User/user/types/trainee';
import { CategoriesComponent } from '../../Components/categories/categories.component';

@Component({
  selector: 'app-edit-assess-cat-modal',
  templateUrl: './edit-assess-cat-modal.component.html',
  styleUrls: ['./edit-assess-cat-modal.component.css']
})
export class EditAssessCatModalComponent implements OnInit {

  category:Category = new Category();  //The category that will be selected for presentation and editing 
  @Input() categories:any []; //The list of categories to be loaded and displayed 
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
  selected(cat:Category){
    this.category = cat;
    this.temp = cat.skillCategory;
    this.tempOwner = cat.categoryOwner;
  }

  //gets the categories from the database and inserts them into the category list 
  getAll(){
    this.categoryService.listAll().subscribe((res)=>{
      var c = JSON.parse(JSON.stringify(res));

      this.categories = c;
    });
  }


  //saves the changes made to the category into the database 
  save(){
    this.category.skillCategory = this.temp;
    this.category.categoryOwner = this.tempOwner;
    this.categoryService.edit(this.category.categoryId,this.category.categoryOwner, this.category.skillCategory, this.category.active).subscribe((res)=>{
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
