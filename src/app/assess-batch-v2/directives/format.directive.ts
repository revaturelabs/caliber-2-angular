import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[format]',
})
export class FormatDirective {

  constructor() { }

  formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-US");

  // Used to determine how to format
  @Input("format") formatType: string;

  format(value: any): string {
    const format = this.formatType.toLowerCase();
    switch (format) {
      case "quarter": 
        return "Q" + value;
      case "batch":
        return `${value.trainer} - ${value.skillType} - ${this.formatter.format(value.startDate)}`;
    }
  }

}
