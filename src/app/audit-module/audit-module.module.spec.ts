import { AuditModule } from './audit-module.module';

describe('AuditModuleModule', () => {
  let auditModuleModule: AuditModule;

  beforeEach(() => {
    auditModuleModule = new AuditModule();
  });

  it('should create an instance', () => {
    expect(auditModuleModule).toBeTruthy();
  });
});
