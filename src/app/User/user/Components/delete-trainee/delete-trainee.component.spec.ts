import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTraineeComponent } from './delete-trainee.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('DeleteTraineeComponent', () => {
  let component: DeleteTraineeComponent;
  let fixture: ComponentFixture<DeleteTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule ],
      declarations: [ DeleteTraineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
