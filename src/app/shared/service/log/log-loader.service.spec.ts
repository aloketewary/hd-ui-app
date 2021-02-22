import { LogLoaderService } from './log-loader.service';
import { TestBed } from '@angular/core/testing';


describe('LogLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogLoaderService = TestBed.get(LogLoaderService);
    expect(service).toBeTruthy();
  });
});
