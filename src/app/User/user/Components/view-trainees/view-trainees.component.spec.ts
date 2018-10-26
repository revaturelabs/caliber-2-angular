import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtraineesComponent } from './view-trainees.component';
import { UserModule } from '../../user.module';
// import { ViewTraineePage } from '../../Tests/view-trainees.test';

describe('ViewtraineesComponent', () => {
  let component: ViewtraineesComponent;
  let fixture: ComponentFixture<ViewtraineesComponent>;
  // let page: ViewTraineePage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtraineesComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtraineesComponent);
    component = fixture.componentInstance;
    // page = new ViewTraineePage();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('displays a modal', () => {
    page.navigateTo();
    page.clickModalButton();
    console.log(page.getModal());
    expect(page.getModal()).toBeTruthy();
  });*/
});
