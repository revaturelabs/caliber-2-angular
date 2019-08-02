import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/User/user/types/trainee';
import { CategoryService } from '../../Services/category-service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


 // categoriesList : Category[] =[];
 categoriesList: any;
 categoriesList1:any;
 categoriesList2:any;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
   this.getAllCategories();
  }

getAllCategories(){
  this.categoryService.listAll().subscribe(res => {
    this.categoriesList = res;
    this.categoriesList1 = this.categoriesList.filter(d => d.active == true);
    this.categoriesList2 = this.categoriesList.filter(d => d.active == false);

  });
}

disableCategory(category){
 
  this.categoryService.disable(category.categoryId, category.categoryOwner, category.skillCategory).subscribe(res=>{});
  setTimeout(() => {
    this.getAllCategories();
  }, 1000);
}

enableCategory(category){
 this.categoryService.enable(category.categoryId, category.categoryOwner, category.skillCategory).subscribe(res => {});
 setTimeout(() => {
  this.getAllCategories();
}, 1000);
}

}
