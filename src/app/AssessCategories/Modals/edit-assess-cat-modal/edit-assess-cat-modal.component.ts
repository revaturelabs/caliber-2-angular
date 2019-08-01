import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/AssessCategories/Services/category-service';
import { Category } from 'src/app/User/user/types/trainee';

@Component({
  selector: 'app-edit-assess-cat-modal',
  templateUrl: './edit-assess-cat-modal.component.html',
  styleUrls: ['./edit-assess-cat-modal.component.css']
})
export class EditAssessCatModalComponent implements OnInit {

  category:Category;
  categories:any;

  constructor(private categoryService:CategoryService) { 

  }

  ngOnInit() {
  
  }

  getActive(){
    this.categoryService.listActive().subscribe((res)=>{

    });
  }
}
