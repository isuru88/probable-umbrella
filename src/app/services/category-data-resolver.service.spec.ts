import { TestBed } from '@angular/core/testing';

import { CategoryDataResolverService } from './category-data-resolver.service';

describe('CategoryDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryDataResolverService = TestBed.get(CategoryDataResolverService);
    expect(service).toBeTruthy();
  });
});
