import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallComponent } from './overall.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QcNote } from '../../types/note';

describe('OverallComponent', () => {
  let component: OverallComponent;
  let fixture: ComponentFixture<OverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        OverallComponent,
       ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallComponent);
    component = fixture.componentInstance;
    component.note = new QcNote(1,'test note',1,1,null,0,'QC_BATCH','Undefined',0,null,0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
