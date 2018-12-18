import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTraineesComponent } from './view-trainees.component';
import { FormsModule } from '@angular/forms';
import { browser, by, element } from 'protractor';
import { UserModule } from '../../user.module';

describe('ViewtraineesComponent', () => {
  let component: ViewTraineesComponent;
  let fixture: ComponentFixture<ViewTraineesComponent>;
  // let page: ViewTraineePage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTraineesComponent);
    component = fixture.componentInstance;
    // page = new ViewTraineePage();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do something', () => {
    browser.get('http://localhost:4200/caliber/%23/vp/manage');
    // element(by.css;
  });

  // Protractor Test for toggling between dropped and active trainees
  // it('should filter out dropped trainees', () => {
  //   browser.get('/manage');
  //   element(by.buttonText('viewTraineesPlaceHolder')).click();
  //   element.all(by.id('trainingStatusColumn')).getText().then(function(text) {

  //   });

  //   element(by.name('toggleTrainee')).click();
  // });
/*
  it('displays a modal', () => {
    page.navigateTo();
    page.clickModalButton();
    console.log(page.getModal());
    expect(page.getModal()).toBeTruthy();
  });*/
});
