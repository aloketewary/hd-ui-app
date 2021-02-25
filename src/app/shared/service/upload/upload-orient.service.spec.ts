import { TestBed } from '@angular/core/testing';

import { UploadOrientService } from './upload-orient.service';

describe('UploadOrientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadOrientService = TestBed.get(UploadOrientService);
    expect(service).toBeTruthy();
  });
});
