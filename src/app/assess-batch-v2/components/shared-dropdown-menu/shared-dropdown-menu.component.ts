import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-dropdown-menu',
  templateUrl: './shared-dropdown-menu.component.html',
  styleUrls: ['./shared-dropdown-menu.component.css']
})
export class SharedDropdownMenuComponent implements OnInit {

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
    } else {
      this.currentDropdownValue = this.selectedValue;
    }
  }

  // getDropdownValue(): string {
  //   if (Boolean(this.selectedValue)) {
  //     if (this.for === 'Batch' && !this.changed) {
  //       return `Select ${this.for}`;
  //     }
  //     return "" + this.selectedValue;
  //   } else {
  //     return `Select ${this.for}`;
  //   }
  // }

  setDropdownValue(value: any, index: number) {
    this.selectedValue = value;
    this.currentDropdownValue = this.selectedValue;
    this.onValueSelect.emit(this.data[index]);
    this.changed = true;
  }

}
