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
      // Merge the resulting array
      mergeMap(res => res),

      // Iterate the assets one by one
      map(asset => {
        const val: Asset[] = [];

        // Split the genres field by ',' and create a new Asset objects for each genre.
        asset.genres.split(',').forEach(genre => {
          const newAsset = new Asset(asset);
          newAsset.genres = genre.trim(); // <- This is a hacky way used to preserve the type Asset;

          val.push(newAsset);
        });

        // Return an array in which a new asset is created for each of the genres.
        return val;
      }),

      // Reduce the array to one array.
      reduce((acc, val) => acc.concat(val)),

      // Merge the resulting array.
      mergeMap(res => res),

      // Group by the genre field.
      groupBy(asset => asset.genres),

      // Merge the resulting groups. zip the groups as [categoryName, Asset[]]
      mergeMap(group => zip(of(group.key), group.pipe(toArray()))),

      // Iterate through each zip and create Category objects.
      map(value => {
        return new Category({ name: value[0], assets: value[1] });
      }),
    );
  }

  getAsset(asset: string): Observable<AssetMetadata> {
    const assetURL = new URL(environment.AssetAPI.replace(environment.AssetPlaceholder, asset));

    // Return an AssetMetada object based on the api response.
    return this.http.get<AssetMetadata>(assetURL.href);
  }
}
