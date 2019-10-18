import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable, of} from "rxjs";
import {QcCategory} from "../../../domain/model/qc-category.dto";
import {Category} from "../../../domain/model/category.dto";
import {QaCategoryService} from "../../../services/subvertical/quality-audit/qa-category.service";
import {categoriesFade} from "../../../app.animations";

@Component({
  selector: 'app-categories-this-week',
  templateUrl: './categories-this-week.component.html',
  styleUrls: ['./categories-this-week.component.css'],
  animations: [categoriesFade]
})
export class CategoriesThisWeekComponent implements OnInit, OnChanges {

  @Input('categories') qcCategories: Category[];
  @Input("week") week: number;
  @Input("batchId") batchId: number;
  categoriesThisWeek$: Observable<QcCategory[]> = of([]);
  categoriesThisWeek: QcCategory[] = [];

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
          this.populateSelectedCategories(this.batchId, change.currentValue);
        }
      } else if (prop === 'batchId') {
        if (this.week && this.batchId) {
          this.populateSelectedCategories(change.currentValue, this.week);
        }
      }
    }
  }

  removeCategory(tag: QcCategory) {
    if (tag) {
      this.qcCategoryService.removeWeeklyQcCategory(tag).toPromise().then(
        () => {
          this.populateSelectedCategories(this.batchId, this.week);
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
    this.qcCategoryService.saveWeeklyQcCategory(tag).subscribe(
      data => {
        const found = this.qcCategories.find(cat => cat.categoryId === data.categoryId);
        if (found) {
          this.populateSelectedCategories(this.batchId, this.week);
        }
      }
    )
  }

  private populateSelectedCategories(batchId: number, week: number): void {
    this.qcCategoryService.getCategoriesByBatchAndWeek(batchId, week).subscribe(
      data => this.categoriesThisWeek = data
    )
  }
}
