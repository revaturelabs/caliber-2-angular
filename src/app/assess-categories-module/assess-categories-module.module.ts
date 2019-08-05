import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

import { CategoriesComponent} from '../AssessCategories/Components/categories/categories.component';
import { AssessCategoriesRoutingModule } from "../assess-categories-module/assess-categories-routing.module";
import { AddAssessCatModalComponent } from '../AssessCategories/Modals/add-assess-cat-modal/add-assess-cat-modal.component';
import { EditAssessCatModalComponent } from '../AssessCategories/Modals/edit-assess-cat-modal/edit-assess-cat-modal.component';
//import { CategoryService } from '../AssessCategories/Services/category-service.service';


@NgModule({
  declarations: [ CategoriesComponent, AddAssessCatModalComponent, EditAssessCatModalComponent ],
  imports: [
    CommonModule, AssessCategoriesRoutingModule, FormsModule, NgbModule.forRoot(), ReactiveFormsModule
  ],
  entryComponents :[CategoriesComponent],
  providers: []
})
export class AssessCategoriesModule { }
