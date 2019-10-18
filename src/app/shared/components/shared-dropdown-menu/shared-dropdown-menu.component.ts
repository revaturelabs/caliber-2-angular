import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

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
    } else if (this.for === 'trainee') {
      this.data.unshift(null);
      this.formattedData = this.data.map(trainee => {
        if (trainee === null) {
          return `Trainees (Overall)`
        } else {
          return trainee.name
        }
      });
      this.setDropdownValue(`Trainees (Overall)`, 0);
    } else if (this.for === 'week') {
      this.formattedData = this.data.map(week => {
        if (week === 0) {
          return `All Weeks`
        } else {
          return `Week ${week}`;
        }
      });
      this.setDropdownValue(`All Weeks`, 0);
    } else {
      this.currentDropdownValue = this.selectedValue;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'selectedValue' && !change.isFirstChange()) {
        if (this.for === 'week') {
          if (change.previousValue === 0 && change.currentValue > 0) {
            this.selectedValue = change.currentValue;
          } else if (change.previousValue > 0 && change.currentValue === 0) {
            this.setDropdownValue(`All Weeks`, 0);
          }
        } else {
          this.selectedValue = change.currentValue;
        }
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
