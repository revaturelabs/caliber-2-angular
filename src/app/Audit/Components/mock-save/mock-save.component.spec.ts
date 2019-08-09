import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockSaveComponent } from './mock-save.component';

describe('MockSaveComponent', () => {
  let component: MockSaveComponent;
  let fixture: ComponentFixture<MockSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
