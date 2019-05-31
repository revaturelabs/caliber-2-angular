import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateComponent } from './associate.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssociateComponent', () => {
  let component: AssociateComponent;
  let fixture: ComponentFixture<AssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
