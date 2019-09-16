import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category-service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


 categoriesList: any;
 categoriesList1:any;
 categoriesList2:any;

  constructor(private categoryService: CategoryService) { }




  ngOnInit() {
    this.loadIntoStorage();
    this.getAllCategories();
  }

getAllCategories(){
  this.categoryService.listAll().subscribe(res => {
    this.categoriesList = res;
    console.log(res);
    this.categoriesList1 = this.categoriesList.filter(d => d.active == true);
    this.categoriesList2 = this.categoriesList.filter(d => d.active == false);

    this.categoriesList1.sort(this.compare);
    this.categoriesList2.sort(this.compare);
  });
}

  compare(a, b) {
  const cat1 = a.skillCategory.toUpperCase();
  const cat2 = b.skillCategory.toUpperCase();
  let comparison = 0;
  if (cat1 > cat2) {
    comparison = 1;
  } else if (cat1 < cat2) {
    comparison = -1;
  }
  return comparison;
}

disableCategory(category){

  this.categoryService.disable(category.categoryId,  category.skillCategory, category.categoryOwner).subscribe(res=>{});

  setTimeout(() => {
    this.getAllCategories();
  }, 700);
  document.getElementById("category"+category.categoryId).classList.add("fadeOutLeft");
}

enableCategory(category){
 this.categoryService.enable(category.categoryId, category.skillCategory, category.categoryOwner).subscribe(res => {});
 document.getElementById("category"+category.categoryId).classList.add("fadeOutLeft");
 setTimeout(() => {
  this.getAllCategories();
}, 700);
document.getElementById("category"+category.categoryId).classList.add("fadeOutLeft");
}

loadIntoStorage(){
  //let id = 1;
  let keyThing = "id";
  localStorage.setItem(keyThing, '1');
}

}
