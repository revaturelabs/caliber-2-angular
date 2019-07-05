import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeToolbarComponent } from './home-toolbar.component';

describe('HomeToolbarComponent', () => {
  let component: HomeToolbarComponent;
  let fixture: ComponentFixture<HomeToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
