import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { HttpClient } from '@angular/common/http';
import { Observable, of, zip } from 'rxjs';
import { mergeMap, groupBy, toArray, map, reduce } from 'rxjs/operators';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';
import { AssetMetadata } from '../models/asset-metadata';

@Injectable({
  providedIn: 'root'
})
export class ContentDataService {

  constructor(private http: HttpClient) { }

  getCatalog(): Observable<Category> {
    const catalogURL = new URL(environment.CatalogAPI);

    return this.http.get<Asset[]>(catalogURL.href).pipe(   
      mergeMap(res => res),  
      map(asset => {
        const val: Asset[] = [];

        asset.genres.split(',').forEach(genre => {
          const newAsset = new Asset(asset);
          newAsset.genres = genre.trim();

          val.push(newAsset)
        });

        return val;
      }),
      reduce((acc, val) => acc.concat(val)),
      mergeMap(res => res), 
      groupBy(asset => asset.genres),
      mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
      map(value => {              
        return new Category({ name: value[0], assets: value[1] });
      }),
    )
  }

  getAsset(asset: string): Observable<AssetMetadata> {
    const assetURL = new URL(environment.AssetAPI.replace(environment.AssetPlaceholder, asset));

    return this.http.get<AssetMetadata>(assetURL.href);
  }
}
