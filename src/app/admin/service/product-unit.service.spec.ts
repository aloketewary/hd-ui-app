import { TestBed } from '@angular/core/testing';

import { ProductUnitService } from './product-unit.service';

describe('ProductUnitService', () => {
  let service: ProductUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
