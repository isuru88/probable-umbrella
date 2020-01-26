import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: string;

  constructor(private locationService: Location, private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.title.subscribe(title => this.title = title);
  }

  goBack() {
    this.locationService.back();
  }
}
