import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFeedComponent } from './content-feed.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CardComponent } from '../common/card/card.component';
import { Asset } from 'src/app/models/asset';
import { Category } from 'src/app/models/category';
import { of } from 'rxjs';
import { ContentDataService } from 'src/app/services/content-data.service';
import { TitleService } from 'src/app/services/title.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ContentFeedComponent', () => {
  let component: ContentFeedComponent;
  let fixture: ComponentFixture<ContentFeedComponent>;

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

  const contentDataService = jasmine.createSpyObj('ContentDataService', ['getCatalog']);
  const titleService = jasmine.createSpyObj('TitleService', ['setTitle']);

  let getCatalogSpy;


  beforeEach(async(() => {

  }));

  beforeEach(() => {
    getCatalogSpy = contentDataService.getCatalog.and.returnValue(of(expectedCategory));

    TestBed.configureTestingModule({
      providers: [
        { provide: ContentDataService, useValue: contentDataService },
        { provide: TitleService, useValue: titleService }
      ],
      imports: [RouterTestingModule, SlickCarouselModule],
      declarations: [ContentFeedComponent, CardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContentFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #getCatalog from ContentDataService', () => {
    expect(getCatalogSpy).toHaveBeenCalled();
  });

  it('should render cards', () => {
    const childDebugElement: DebugElement = fixture.debugElement.query(By.directive(CardComponent));
    expect(childDebugElement).toBeTruthy();
  });

  it('should set the category name as Movies', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith('Movies');
  });

  it('should navigate to category when category header is clicked', () => {
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe(`/category/${expectedCategory.name}`);
  });

  it('should have the category header with the category name in uppercase', () => {
    expect(fixture.nativeElement.querySelector('span').innerText).toBe(expectedCategory.name.toUpperCase());
  });
});
