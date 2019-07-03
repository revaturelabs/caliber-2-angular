import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportTopChartController } from './report-top-chart-controller.component';


describe('TabularTraineeAverageListComponentComponent', () => {
  let component: ReportTopChartController;
  let fixture: ComponentFixture<ReportTopChartController>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTopChartController ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTopChartController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
