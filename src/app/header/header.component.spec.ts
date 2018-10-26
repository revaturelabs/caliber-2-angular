import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterOutlet } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent,
      RouterOutlet ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('should check all links exist', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#home-link').textContent).toContain('Home');
    expect(compiled.querySelector('#manage-link').textContent).toContain('Manage Batch');
    expect(compiled.querySelector('#assess-link').textContent).toContain('Assess Batch');
    expect(compiled.querySelector('#quality-link').textContent).toContain('Quality Audit');
    expect(compiled.querySelector('#panel-link').textContent).toContain('Panel');
    expect(compiled.querySelector('#reports-link').textContent).toContain('Reports');

    expect(compiled.querySelector('#trainers-link').textContent).toContain('Trainers');
    expect(compiled.querySelector('#location-link').textContent).toContain('Location');
    expect(compiled.querySelector('#category-link').textContent).toContain('Category');

    expect(compiled.querySelector('#logo-id')).toBeTruthy() ;

  });

});
