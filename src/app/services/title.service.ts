import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  title = new BehaviorSubject('Movies');

  constructor(private browserTitle: Title) {}

  setTitle(title: string) {
    this.title.next(title);
    this.browserTitle.setTitle(title);
  }
}
