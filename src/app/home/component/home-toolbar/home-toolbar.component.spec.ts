import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeToolbarComponent } from './home-toolbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeToolbarComponent', () => {
  let component: HomeToolbarComponent;
  let fixture: ComponentFixture<HomeToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeToolbarComponent ],
      imports: [
        FormsModule, HttpClientTestingModule],
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
