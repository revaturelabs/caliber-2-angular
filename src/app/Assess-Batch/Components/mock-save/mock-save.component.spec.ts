import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'zone.js/dist/zone-testing'
import { MockSaveComponent } from './mock-save.component';
import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} 
from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
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
