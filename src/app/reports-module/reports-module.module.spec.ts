import { TestBed } from '@angular/core/testing';
import { ReportsModule } from './reports-module.module';


describe('ReportsModuleModule', () => {
  let reportsModuleModule: ReportsModule;

  beforeEach(() => {
    reportsModuleModule = new ReportsModule();
  });

  it('should create an instance', () => {
    expect(reportsModuleModule).toBeTruthy();
  });
});