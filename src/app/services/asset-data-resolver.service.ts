import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { ContentDataService } from './content-data.service';
import { mergeMap } from 'rxjs/operators';
import { AssetMetadata } from '../models/asset-metadata';

@Injectable({
  providedIn: 'root'
})

export class AssetDataResolverService implements Resolve<AssetMetadata> {
  constructor(private contentDataService: ContentDataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AssetMetadata> | Observable<never> {
    const assetName = route.paramMap.get('name');

    return this.contentDataService.getAsset(assetName).pipe(mergeMap(asset => {
      if (asset) {        
        return of(asset);
      } else {
        this.router.navigate(['/']);
        return EMPTY;
      }
    }))
  }
}
