import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryViewComponent } from './category-view.component';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { of } from 'rxjs';
import { CardComponent } from '../common/card/card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Asset } from 'src/app/models/asset';
import { TitleService } from 'src/app/services/title.service';

describe('CategoryViewComponent', () => {
  let component: CategoryViewComponent;
  let fixture: ComponentFixture<CategoryViewComponent>;

  const expectedAsset: Asset = new Asset({
    asset: 'brooklyn',
    title: 'Brooklyn',
    subtitle: 'Not Queens',
    cover_path: 'brooklyn/cover/large_home.png',
    runtime: 115,
    genres: 'Romances',
    tags: ''
  });

  const expectedCategory: Category = new Category({
    name: 'Romances',
    assets: [expectedAsset]
  });

  const route = ({
    data: of({ category: expectedCategory })
  });

  const titleService = jasmine.createSpyObj('TitleService', ['setTitle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryViewComponent, CardComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: TitleService, useValue: titleService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cards', () => {
    const childDebugElement: DebugElement = fixture.debugElement.query(By.directive(CardComponent));
    expect(childDebugElement).toBeTruthy();
  });

  it('should set the category name as title', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith(expectedCategory.name);
  });
});
