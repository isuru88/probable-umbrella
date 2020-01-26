import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentFeedComponent } from './components/content-feed/content-feed.component';
import { CategoryViewComponent } from './components/category-view/category-view.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { AssetDataResolverService } from './services/asset-data-resolver.service';
import { CategoryDataResolverService } from './services/category-data-resolver.service';


const routes: Routes = [
  { path: "", component: ContentFeedComponent },
  { path: "category/:category", component: CategoryViewComponent, resolve: { category: CategoryDataResolverService } },
  { path: "asset/:name", component: DetailViewComponent, resolve: { asset: AssetDataResolverService } },
  { path: "asset/:name/play", component: VideoPlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
