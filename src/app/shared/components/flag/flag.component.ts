import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit, OnChanges {

  @Input('type') type: string;
  @Input('selected') selected: string;
  @Input('tiny') tiny: boolean = false;
  @Output('onFlagClick') onFlagClick: EventEmitter<string> = new EventEmitter<string>(true);

  classes: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      if (prop === 'type') {
        this.classes = this.getClass(this.type);
      } else if (prop === 'tiny') {
        this.classes = this.getTinyClass(this.selected);
      } else if (prop === 'selected') {
        const change = changes[prop];
        if (!change.isFirstChange()) {
          if (this.tiny) {
            this.classes = this.getTinyClass(change.currentValue)
          }
        }
      }
    }
  }



  getClass(type: string) {
    switch (type) {
      case "GREEN":
        return "fas fa-flag green-flag fa-3x";
      case "RED":
        return "fas fa-flag red-flag fa-3x";
      case "TRAINER":
        return "fas fa-star blue-star fa-3x";
    }
  }

  getSelectedClass(type: string) {
    switch (type) {
      case "GREEN":
        return "fas fa-flag green-flag green-flag-hover fa-3x ";
      case "RED":
        return "fas fa-flag red-flag red-flag-hover fa-3x ";
      case "TRAINER":
        return "fas fa-star blue-star blue-star-hover fa-3x ";
    }
  }

  getTinyClass(type: string) {
    switch (type) {
      case "GREEN":
        return "fas fa-flag green-flag fa-sm";
      case "RED":
        return "fas fa-flag red-flag fa-sm";
      case "TRAINER":
        return "fas fa-star blue-star fa-sm";
    }
  }

  onFlagSelect() {
    this.onFlagClick.next(this.type);
  }

}
