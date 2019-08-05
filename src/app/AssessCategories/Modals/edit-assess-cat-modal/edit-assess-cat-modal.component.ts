import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/AssessCategories/Services/category-service';
import { Category } from 'src/app/User/user/types/trainee';

@Component({
  selector: 'app-edit-assess-cat-modal',
  templateUrl: './edit-assess-cat-modal.component.html',
  styleUrls: ['./edit-assess-cat-modal.component.css']
})
export class EditAssessCatModalComponent implements OnInit {

  category:Category;  //The category that will be selected for presentation and editing 
  categories:any;     //The list of categories to be loaded and displayed 

  constructor(private categoryService:CategoryService) { 

  }

  ngOnInit() {
    this.getAll();
  }

  //sets the selected category as the local category to be edited 
  selected(cat:Category){
    this.category = cat;
  }

  //gets the categories from the database and inserts them into the category list 
  getAll(){
    this.categoryService.listAll().subscribe((res)=>{
      this.categories = res;
    });
  }


  //saves the changes made to the category into the database 
  save(){
    this.categoryService.edit(this.category.categoryId,this.category.categoryOwner, this.category.skillCategory, this.category.active).subscribe((res)=>{
      this.categories = res;
    });
  }
}
