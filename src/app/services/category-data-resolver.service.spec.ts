import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CategoryDataResolverService } from './category-data-resolver.service';
import { Asset } from '../models/asset';
import { Category } from '../models/category';
import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';

describe('CategoryDataResolverService', () => {
  const expectedAsset: Asset = new Asset({
    asset: 'brooklyn',
    title: 'Brooklyn',
    subtitle: 'Not Queens',
    cover_path: 'brooklyn/cover/large_home.png',
    runtime: 115,
    genres: 'Romances',
    tags: ''
  });

  const expectedCategory: Category = new Category({
    name: 'Romances',
    assets: [expectedAsset]
  });

  const contentService = jasmine.createSpyObj('ContentDataService', ['getCatalog']);
  const router = jasmine.createSpyObj('Router', ['navigate']);

  const resolver = new CategoryDataResolverService(contentService, router);

  let route: any;

  beforeEach(() => {
    route = {};

    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });

  it('should be created', () => {
    const service: CategoryDataResolverService = TestBed.get(CategoryDataResolverService);
    expect(service).toBeTruthy();
  });

  it('should return a Category object when category is available', () => {
    contentService.getCatalog = jasmine.createSpy().and.returnValue(of(expectedCategory));
    route.paramMap = convertToParamMap({ category: 'Romances' });

    const asset = resolver.resolve(route, null);
    expect(contentService.getCatalog).toHaveBeenCalled();
    asset.subscribe(resolvedCategory => expect(resolvedCategory).toEqual(expectedCategory));
  });

  it('should navigate when category is not available', () => {
    contentService.getCatalog = jasmine.createSpy().and.returnValue(of([]));
    router.navigate = jasmine.createSpy();

    route.paramMap = convertToParamMap({ name: 'brooklyn' });

    const category = resolver.resolve(route, null);
    expect(contentService.getCatalog).toHaveBeenCalled();
    category.subscribe(resolvedCategory => expect(resolvedCategory).toEqual(null));
    expect(router.navigate).toHaveBeenCalled();
  });
});
