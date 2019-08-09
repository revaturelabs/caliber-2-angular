import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import {CategoriesComponent} from "../AssessCategories/Components/categories/categories.component";

const routes: Routes = [{path: "", component: CategoriesComponent}];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AssessCategoriesRoutingModule { }
