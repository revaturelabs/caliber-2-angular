import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent} from "../Assess-Categories/Components/add-category/add-category.component";
import {EditCategoryComponent} from "../Assess-Categories/Components/edit-category/edit-category.component";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssessCategoriesRoutingModule} from "../assess-categories-module/assess-categories-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AddCategoryComponent, EditCategoryComponent],
  imports: [
    CommonModule, AssessCategoriesRoutingModule, FormsModule, FormsModule, NgbModule.forRoot(), ReactiveFormsModule
  ],
  entryComponents : [AddCategoryComponent, EditCategoryComponent],

})
export class AssessCategoriesModule { }
