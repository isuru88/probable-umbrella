import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContentDataService } from './content-data.service';

describe('ContentDataService', () => {
  let httpTestingController: HttpTestingController;
  let service: ContentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentDataService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ContentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCatalog', () => {
    const mockData = [
      {
        asset: 'brooklyn',
        title: 'Brooklyn',
        subtitle: 'Not Queens',
        cover_path: 'brooklyn/cover/large_home.png',
        runtime: 115,
        genres: 'Romances',
        tags: ''
      },
      {
        asset: 'chappie',
        title: 'Chappie',
        subtitle: 'Chappie',
        cover_path: 'chappie/cover/large_home.png',
        runtime: 120,
        genres: 'Sci-Fi',
        tags: ''
      },
      {
        asset: 'crimsonpeak',
        title: 'Crimson Peak',
        subtitle: 'Crimson Peak',
        cover_path: 'crimsonpeak/cover/large_home.png',
        runtime: 119,
        genres: 'Horror',
        tags: ''
      }
    ];

    it('should return categories', () => {
      service.getCatalog().subscribe(category => {
        expect(['Romances', 'Sci-Fi', 'Horror']).toContain(category.name);
      });

      const req = httpTestingController.expectOne('http://media.cms.showcase.axtest.net/api/storage/publish/movies/_catalog.json');

      expect(req.request.method).toBe('GET');

      req.flush(mockData);
    });
  });

  describe('getAsset', () => {

    const mockData = {
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
    };

    it('should return asset', () => {
      service.getAsset('brooklyn').subscribe(asset => {
        expect(asset.title).toBe('Brooklyn');
      });

      const req = httpTestingController.expectOne('http://media.cms.showcase.axtest.net/api/storage/publish/movies/brooklyn/metadata.json');

      expect(req.request.method).toBe('GET');

      req.flush(mockData);
    });
  });
});
