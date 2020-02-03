import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewComponent } from './detail-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AssetMetadata } from 'src/app/models/asset-metadata';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';

describe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;

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

  const route = ({
    data: of({ asset: expectedAsset })
  });

  const titleService = jasmine.createSpyObj('TitleService', ['setTitle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DetailViewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: TitleService, useValue: titleService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the movie name as title', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith(expectedAsset.title);
  });

  it('should set generate the image urls', () => {
    expect(component.coverURL)
      .toBe('http://media.cms.showcase.axtest.net/api/storage/publish/movies/brooklyn/cover/large_video_detail.png');
    expect(component.thumbURL)
      .toBe('http://media.cms.showcase.axtest.net/api/storage/publish/movies/brooklyn/cover/small_video_list.png');
  });

  it('should navigate to player when clicked', () => {
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe(`/asset/brooklyn/play`);
  });
});
