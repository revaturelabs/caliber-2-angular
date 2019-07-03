import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabularTraineeAverageListComponent } from './tabular-trainee-average-list.component';


describe('TabularTraineeAverageListComponentComponent', () => {
  let component: TabularTraineeAverageListComponent;
  let fixture: ComponentFixture<TabularTraineeAverageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabularTraineeAverageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularTraineeAverageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
