import {Pipe, PipeTransform} from "@angular/core";
import {Category} from "../../domain/model/category.dto";
import {QcCategory} from "../../domain/model/qc-category.dto";

@Pipe({
  name: 'categorySelector'
})
export class CategorySelectorPipe implements PipeTransform {

  transform(all: Category[], selected: QcCategory[]): Category[] {
    if (all && all.length > 0 && selected && selected.length > 0) {
      const found: Category[] = [];
      all.forEach(category => {
        if (selected.filter(qcCategory => qcCategory.categoryId === category.categoryId).length === 0) {
          found.push(category)
        }
      });
      return found;
    }
    return all;
  }

}
