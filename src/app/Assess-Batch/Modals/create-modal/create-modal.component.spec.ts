import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModalComponent } from './create-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateModalComponent', () => {
  let component: CreateModalComponent;
  let fixture: ComponentFixture<CreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateModalComponent ],
      imports: [
        FormsModule, HttpClientTestingModule],
        providers:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
