import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/User/user/types/trainee';
import { CategoryServiceService } from '../../Services/category-service.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

dummyList = [
  {
    "categoryId": 1,
    "skillCategory": "test3",
    "categoryOwner": "testPerson",
    "active": false
  },
  {
    "categoryId": 2,
    "skillCategory": "test4",
    "categoryOwner": "testPerson",
    "active": false
  },
  {
    "categoryId": 3,
    "skillCategory": "test5",
    "categoryOwner": "testPerson",
    "active": true
  }
] 

//this.dummyList

 // categoriesList : Category[] =[];
 categoriesList:any;
  constructor(private categoryService: CategoryServiceService) { }

  ngOnInit() {
    this.getAllCategories();
  }

getAllCategories(){
  this.categoryService.listAll().subscribe(res => {
    console.log(res);
    this.categoriesList = res;

  //  this.categoriesList.push(res);

    console.log("bummer");
  });
}

disableCategory(category){
  console.log(category);
  this.categoryService.disable(category.categoryId, category.categoryOwner, category.skillCategory).subscribe(res=>{});
  this.getAllCategories();
}

}
