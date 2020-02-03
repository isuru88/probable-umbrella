import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  title = new BehaviorSubject('Movies');

  constructor(private browserTitle: Title) { }

  // This function is used to set the browser title and the page header in AppComponent.
  setTitle(title: string) {
    this.title.next(title);
    this.browserTitle.setTitle(title);
  }
}
