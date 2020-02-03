import { TestBed } from '@angular/core/testing';

import { TitleService } from './title.service';
import { Title } from '@angular/platform-browser';

describe('TitleService', () => {
  let service: TitleService;
  let browserTitle: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Title
      ]
    });

    service = TestBed.get(TitleService);
    browserTitle = TestBed.get(Title);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default value of Movies', () => {
    service.title.subscribe(value => expect(value).toBe('Movies'));
  });

  it('should update the title when #setTitle is called', () => {
    const newTitle = 'newTitle';

    service.title.subscribe(value => expect(['Movies', 'newTitle']).toContain(value));

    service.setTitle(newTitle);

    expect(browserTitle.getTitle()).toBe('newTitle');
  });
});
