import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBatchComponent } from './switch-batch.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SwitchBatchComponent', () => {
  let component: SwitchBatchComponent;
  let fixture: ComponentFixture<SwitchBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchBatchComponent ],
      imports: [
        FormsModule, HttpClientTestingModule],
        providers:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
