
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterBatchPipeService implements PipeTransform {
  transform(batch: any[], searchText: string): any[] {
    if (!batch) return [];
    if (!searchText) return batch;
    searchText = searchText.toLowerCase();
    return batch.filter(it => {
      console.log(it)
      return it.trainer.toLowerCase().includes(searchText);
    });
  }
}