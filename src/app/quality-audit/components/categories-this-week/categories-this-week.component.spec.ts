import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesThisWeekComponent } from './categories-this-week.component';

describe('CategoriesThisWeekComponent', () => {
  let component: CategoriesThisWeekComponent;
  let fixture: ComponentFixture<CategoriesThisWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesThisWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesThisWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
