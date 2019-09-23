import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QaService} from "../../../services/qa.service";
import {Observable, of} from "rxjs";
import {QcCategory} from "../../../domain/model/qc-category.dto";
import {Category} from "../../../domain/model/category.dto";
import {QaCategoryService} from "../../../services/subvertical/quality-audit/qa-category.service";

@Component({
  selector: 'app-categories-this-week',
  templateUrl: './categories-this-week.component.html',
  styleUrls: ['./categories-this-week.component.css']
})
export class CategoriesThisWeekComponent implements OnInit, OnChanges {

  @Input('categories') categories: Category[];
  @Input("week") week: number;
  @Input("batchId") batchId: number;
  categoriesThisWeek$: Observable<QcCategory[]> = of([]);

  constructor(
    private qcCategoryService: QaCategoryService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'week') {
        if (this.week && this.batchId) {
          this.categoriesThisWeek$ = this.qcCategoryService.getCategoriesByBatchAndWeek(this.batchId, change.currentValue);
        }
      } else if (prop === 'batchId') {
        if (this.week && this.batchId) {
          this.categoriesThisWeek$ = this.qcCategoryService.getCategoriesByBatchAndWeek(change.currentValue, this.week);
        }
      }
    }
  }

  removeCategory(tag: QcCategory) {
    if (tag) {
      this.qcCategoryService.removeWeeklyQcCategory(tag).toPromise().then(
        () => {
          this.categoriesThisWeek$ = this.qcCategoryService.getCategoriesByBatchAndWeek(this.batchId, this.week);
        }
      )
    }
  }

  selectCategory(category: Category) {
    const tag: QcCategory = {
      categoryId: category.categoryId,
      batchId: this.batchId,
      week: this.week,
      skillCategory: category.skillCategory,
    };
    this.qcCategoryService.saveWeeklyQcCategory(tag).toPromise().then(
      data => {
        const found = this.categories.find(cat => cat.categoryId === data.categoryId);
        if (found) {
          this.categoriesThisWeek$ = this.qcCategoryService.getCategoriesByBatchAndWeek(this.batchId, this.week);
        }
      }
    )
  }
}
