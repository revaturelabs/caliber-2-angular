import { AuditModuleModule } from './audit-module.module';

describe('AuditModuleModule', () => {
  let auditModuleModule: AuditModuleModule;

  beforeEach(() => {
    auditModuleModule = new AuditModuleModule();
  });

  it('should create an instance', () => {
    expect(auditModuleModule).toBeTruthy();
  });
});
