import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '../../../models/asset';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() item: Asset;

  constructor() { }

  ngOnInit() {
  }

  getUrl() {
    return `url('${environment.AssetThumbnailAPI.replace(environment.AssetPlaceholder, this.item.asset)}')`;
  }

}
