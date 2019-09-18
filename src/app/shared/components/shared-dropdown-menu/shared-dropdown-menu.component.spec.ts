import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDropdownMenuComponent } from './shared-dropdown-menu.component';

describe('SharedDropdownMenuComponent', () => {
  let component: SharedDropdownMenuComponent;
  let fixture: ComponentFixture<SharedDropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDropdownMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
