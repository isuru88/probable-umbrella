import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AssetMetadata } from 'src/app/models/asset-metadata';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  coverURL: string;
  thumbURL: string;
  asset: AssetMetadata;

  constructor(private route: ActivatedRoute, private titleService: TitleService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { asset: AssetMetadata }) => {
      this.asset = data.asset;
      this.coverURL = environment.AssetImageAPI.replace(environment.AssetPlaceholder, data.asset.id.toLowerCase());
      this.thumbURL = environment.AssetThumbnailAPI.replace(environment.AssetPlaceholder, data.asset.id.toLowerCase());

      this.titleService.setTitle(data.asset.title);
    });
  }

}
