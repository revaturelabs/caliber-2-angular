import { AuditRoutingModule } from './audit-routing.module';

describe('AuditRoutingModule', () => {
  let auditRoutingModule: AuditRoutingModule;

  beforeEach(() => {
    auditRoutingModule = new AuditRoutingModule();
  });

  it('should create an instance', () => {
    expect(auditRoutingModule).toBeTruthy();
  });
});
