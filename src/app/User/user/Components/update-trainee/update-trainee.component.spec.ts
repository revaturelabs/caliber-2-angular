import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateTraineeComponent } from './update-trainee.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('UpdateTraineeComponent', () => {
  let component: UpdateTraineeComponent;
  let fixture: ComponentFixture<UpdateTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [UpdateTraineeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});