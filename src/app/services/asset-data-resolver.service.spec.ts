import { TestBed } from '@angular/core/testing';

import { AssetDataResolverService } from './asset-data-resolver.service';

describe('AssetDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetDataResolverService = TestBed.get(AssetDataResolverService);
    expect(service).toBeTruthy();
  });
});
