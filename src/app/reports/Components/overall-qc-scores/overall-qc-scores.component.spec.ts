import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallQCScoresComponent } from './overall-qc-scores.component';
import { ReportService } from '../../Service/report.service';
import { browser } from 'protractor';

// describe('OverallQCScoresComponent', () => {
//   let component: OverallQCScoresComponent;
//   let fixture: ComponentFixture<OverallQCScoresComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ OverallQCScoresComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OverallQCScoresComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('OverallQCScoresComponent', () => {
  it('Should see the Batch QC scores', function() {
    browser.get("https://express.google.com/u/0/");
    expect(browser.getTitle()).toBe("Google Express - Shopping done fast");
});
});
