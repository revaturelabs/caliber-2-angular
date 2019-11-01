import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import {CategoriesComponent} from "../AssessmentCategories/Components/categories/categories.component";

const routes: Routes = [{path: "", component: CategoriesComponent, data: { animation: "CategoriesPage" }}];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AssessCategoriesRoutingModule { }
