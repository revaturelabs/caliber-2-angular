import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { MissingGradesListComponent } from './missing-grades-list.component';

fdescribe('MissingGradesListComponent', () => {
  let component: MissingGradesListComponent;
  let fixture: ComponentFixture<MissingGradesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MissingGradesListComponent],
      providers : [MissingGradesListComponent],
      imports: [HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingGradesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it("number of current batches with missing grades", () => {
    component.getMissingGradesFromActiveBatches(); 
    
  });
});
