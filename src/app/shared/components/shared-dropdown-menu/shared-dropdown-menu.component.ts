import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-shared-dropdown-menu',
  templateUrl: './shared-dropdown-menu.component.html',
  styleUrls: ['./shared-dropdown-menu.component.css']
})
export class SharedDropdownMenuComponent implements OnInit, OnChanges {

  @Input("data") data: any[];
  @Input("format") format: any;
  @Input("dropdownFor") for: any; // Display name for when a value has not been selected in dropdown
                                  // Providing [for]="Quarter" => `Select Quarter` is rendered
  @Input("selectedValue") selectedValue: any;
  @Output("onValueSelect") onValueSelect: EventEmitter<any> = new EventEmitter();
  formattedData: any[];
  changed: boolean = false;

  currentDropdownValue: string;

  constructor() {
  }

  ngOnInit() {
    if (this.format !== undefined) {
      this.formattedData = this.data.map(item => this.format.call(null, item));
      this.selectedValue = this.format.call(null, this.selectedValue);
    } else {
      this.formattedData = this.data;
    }

    if (this.for === 'Batch' && !this.changed) {
      this.currentDropdownValue = `Select ${this.for}`;
    } else if (this.for === 'manageBatchYear') {
      const index = this.data.indexOf(this.selectedValue);
      if (index > 0) {
        this.setDropdownValue(this.data[index], index);
      } else {
        this.setDropdownValue(this.data[0], 0);
      }
    } else {
      this.currentDropdownValue = this.selectedValue;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'selectedValue' && !change.isFirstChange()) {
        this.selectedValue = change.currentValue;
      }
    }
  }


  setDropdownValue(value: any, index: number) {
    this.selectedValue = value;
    this.currentDropdownValue = this.selectedValue;
    this.onValueSelect.emit(this.data[index]);
    this.changed = true;
  }

}
