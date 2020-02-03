import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Category } from '../models/category';
import { ContentDataService } from './content-data.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, find } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataResolverService implements Resolve<Category>  {

  constructor(private contentDataService: ContentDataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> | Observable<never> {
    const categoryName = route.paramMap.get('category');

    return this.contentDataService.getCatalog().pipe(
      find((category) => category.name === categoryName),
      mergeMap(category => {
        if (category) {
          return of(category);
        } else {
          this.router.navigate(['/']);
          return EMPTY;
        }
      })
    );
  }
}
