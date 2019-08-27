import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeToolbarComponent } from './home-toolbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

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

  it('test showState()',()=>{
    expect(component.showStates).toBe(false);
    component.calShowState(component.states[0]);
    expect(component.showStates).toBe(true);
  });

  it('test selectState',()=>{
    
  });
  it('test selectStateAndCity',()=>{

  });
  it('test selectCity',()=>{

  });
  it('test initializeAllLocations',()=>{

  });
  it('test initializeCurrentBatches',()=>{

  });
  it('test initializeCurrentBatchesFromLocations',()=>{

  });
  it('test initilaizeAllQANotes',()=>{

  });
  it('test setStatesViaLocations',()=>{

  });
});
