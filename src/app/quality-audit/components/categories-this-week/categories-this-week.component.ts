import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../../Assess-Batch/Models/Category";
import {QaService} from "../../services/qa.service";

@Component({
  selector: 'app-categories-this-week',
  templateUrl: './categories-this-week.component.html',
  styleUrls: ['./categories-this-week.component.css']
})
export class CategoriesThisWeekComponent implements OnInit {

  @Input('categories') categories: Category[];

  constructor(
    private qaService: QaService
  ) { }

  ngOnInit() {
  }

}
