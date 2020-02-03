import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AssetDataResolverService } from './asset-data-resolver.service';
import { ContentDataService } from './content-data.service';
import { AssetMetadata } from '../models/asset-metadata';
import { of, EMPTY } from 'rxjs';
import { Router, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';

describe('AssetDataResolverService', () => {
  const expectedAsset: AssetMetadata = new AssetMetadata({
    id: 'Brooklyn',
    title: 'Brooklyn',
    subtitle: 'Not Queens',
    description: 'An Irish immigrant lands in 1950s Brooklyn, \
      where she quickly falls into a romance with a local. \
      When her past catches up with her, however, she must choose \
      between two countries and the lives that exist within. (Sintel)',
    genres: 'Romances',
    cast: 'Saoirse Ronan, Domhnall Gleeson, Emory Cohen',
    directors: 'John Crowley',
    year: 2015,
    country: 'USA',
    runtime: 115,
    age_rating: 'PG-13',
    tags: '',
    streams: [
      {
        name: 'MPEG-DASH',
        url: 'http://media.axprod.net/Cypris/Sintel/Encrypted/Manifest.mpd'
      }
    ],
    licensing: {
      name: null,
      subscription: true,
      ad: true,
      transaction: true,
      valid_from: null,
      valid_till: null
    }
  });

  const contentService = jasmine.createSpyObj('ContentDataService', ['getAsset']);
  const router = jasmine.createSpyObj('Router', ['navigate']);

  const resolver = new AssetDataResolverService(contentService, router);

  let route: any;

  beforeEach(() => {
    route = {};

    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });

  it('should be created', () => {
    const service: AssetDataResolverService = TestBed.get(AssetDataResolverService);
    expect(service).toBeTruthy();
  });

  it('should return an AssetMetadata object when asset is available', () => {
    contentService.getAsset = jasmine.createSpy().and.returnValue(of(expectedAsset));
    route.paramMap = convertToParamMap({ name: 'brooklyn' });

    const asset = resolver.resolve(route, null);
    expect(contentService.getAsset).toHaveBeenCalledWith('brooklyn');
    asset.subscribe(resolvedAsset => expect(resolvedAsset).toEqual(expectedAsset));
  });

  it('should navigate when asset is not available', () => {
    contentService.getAsset = jasmine.createSpy().and.returnValue(of(null));
    router.navigate = jasmine.createSpy();

    route.paramMap = convertToParamMap({ name: 'brooklyn' });

    const asset = resolver.resolve(route, null);
    expect(contentService.getAsset).toHaveBeenCalledWith('brooklyn');
    asset.subscribe(resolvedAsset => expect(resolvedAsset).toEqual(null));
    expect(router.navigate).toHaveBeenCalled();
  });
});
