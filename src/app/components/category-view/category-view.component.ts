import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  category: Category;

  constructor(private route: ActivatedRoute, private titleService: TitleService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { category: Category }) => {
      this.category = data.category;
      this.titleService.setTitle(data.category.name);
    });
  }

}
