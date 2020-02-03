import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Asset } from 'src/app/models/asset';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const expectedAsset = new Asset({
    asset: 'brooklyn',
    title: 'Brooklyn',
    subtitle: 'Not Queens',
    cover_path: 'brooklyn/cover/large_home.png',
    runtime: 115,
    genres: 'Romances',
    tags: ''
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.item = expectedAsset;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title', () => {
    expect(fixture.nativeElement.querySelector('h4').innerText).toEqual(expectedAsset.title);
  });

  it('should set the background image url', () => {
    const expectedURL = 'url("http://media.cms.showcase.axtest.net/api/storage/publish/movies/'
      + expectedAsset.asset + '/cover/small_video_list.png")';

    expect(fixture.nativeElement.querySelector('.card').style.backgroundImage).toEqual(expectedURL);
  });

  it('should navigate when clicked', () => {
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe(`/asset/${expectedAsset.asset}`);
  });
});
