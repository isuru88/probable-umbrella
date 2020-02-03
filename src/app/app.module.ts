import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentFeedComponent } from './components/content-feed/content-feed.component';
import { CategoryViewComponent } from './components/category-view/category-view.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { CardComponent } from './components/common/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentFeedComponent,
    CategoryViewComponent,
    DetailViewComponent,
    VideoPlayerComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
