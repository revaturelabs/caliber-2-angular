import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Category} from "../../../Assess-Batch/Models/Category";
import {QaService} from "../../services/qa.service";
import {Tag} from "../../../Audit/types/Tag";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-categories-this-week',
  templateUrl: './categories-this-week.component.html',
  styleUrls: ['./categories-this-week.component.css']
})
export class CategoriesThisWeekComponent implements OnInit, OnChanges {

  @Input('categories') categories: Category[];
  @Input("week") week: number;
  @Input("batchId") batchId: number;
  categoriesThisWeek$: Observable<Tag[]> = of([]);

  constructor(
    private qaService: QaService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'week') {
        if (this.week && this.batchId) {
          this.categoriesThisWeek$ = this.qaService.getCategoriesByBatchAndWeek(this.batchId, change.currentValue);
        }
      } else if (prop === 'batchId') {
        if (this.week && this.batchId) {
          this.categoriesThisWeek$ = this.qaService.getCategoriesByBatchAndWeek(change.currentValue, this.week);
        }
      }
    }
  }

  removeCategory(tag: Tag) {
    if (tag) {
      this.qaService.removeWeeklyQcCategory(tag).toPromise().then(
        () => {
          this.categoriesThisWeek$ = this.qaService.getCategoriesByBatchAndWeek(this.batchId, this.week);
        }
      )
    }
  }

  selectCategory(category: Category) {
    const tag: Tag = new Tag(category.categoryId, category.skillCategory, this.batchId, this.week);
    this.qaService.saveWeeklyQcCategory(tag).toPromise().then(
      data => {
        const found = this.categories.find(cat => cat.categoryId === data.categoryId);
        if (found) {
          this.categoriesThisWeek$ = this.qaService.getCategoriesByBatchAndWeek(this.batchId, this.week);
        }
      }
    )
  }
}
