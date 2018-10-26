import { BatchModule } from './batch.module';

describe('BatchModule', () => {
  let batchModule: BatchModule;

  beforeEach(() => {
    batchModule = new BatchModule();
  });

  it('should create an instance', () => {
    expect(batchModule).toBeTruthy();
  });
});

describe('Always True', () => {
  it('always true', () => {
    expect(true).toBeTruthy();
  });
});
