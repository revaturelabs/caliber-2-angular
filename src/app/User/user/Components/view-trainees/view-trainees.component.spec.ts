import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtraineesComponent } from './view-trainees.component';
import { browser, by, element } from 'protractor';
import { Driver } from 'selenium-webdriver/chrome';

describe('ViewtraineesComponent', () => {
  let component: ViewtraineesComponent;
  let fixture: ComponentFixture<ViewtraineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtraineesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtraineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //Protractor Test for toggling between dropped and active trainees
  // it('should filter out dropped trainees', () => {
  //   browser.get('/manage');
  //   element(by.buttonText('viewTraineesPlaceHolder')).click();
  //   element.all(by.id('trainingStatusColumn')).getText().then(function(text) {

  //   });

  //   element(by.name('toggleTrainee')).click();
  // });
});
