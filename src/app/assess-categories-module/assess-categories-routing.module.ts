import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AddCategoryComponent } from "../Assess-Categories/Components/add-category/add-category.component";

const routes: Routes = [{ path: "", component: AddCategoryComponent }];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), CommonModule]
})
export class AssessCategoriesRoutingModule { }
