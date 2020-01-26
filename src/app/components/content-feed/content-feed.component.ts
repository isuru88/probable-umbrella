import { Component, OnInit, HostListener } from '@angular/core';
import { ContentDataService } from 'src/app/services/content-data.service';
import { Category } from 'src/app/models/category';
import { TitleService } from 'src/app/services/title.service';


@Component({

  selector: 'app-content-feed',
  templateUrl: './content-feed.component.html',
  styleUrls: ['./content-feed.component.css'],
  providers: [ContentDataService]
})
export class ContentFeedComponent implements OnInit {

  maxSlides = 0;
  categories: Category[] = [];
  slideConfig = {
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    variableWidth: true,
    responsive: []
  };

  constructor(private contentDataService: ContentDataService, private titleService: TitleService) { }

  ngOnInit() {
    this.contentDataService.getCatalog().subscribe(category => {
      this.categories.push(category);
      if (category.assets.length > this.maxSlides) {
        this.maxSlides = category.assets.length;
        
        const cardWidth = 220;
        const responsive = [];
  
        for (let index = 1; index <= this.maxSlides + 1; index++) {
          responsive.push({
            breakpoint: cardWidth * index,
            settings: {
              slidesToShow: index,
              slidesToScroll: 1
            }
          })          
        }

        this.slideConfig.slidesToShow = this.maxSlides;
        this.slideConfig.responsive = responsive;
      }
    });

    this.titleService.setTitle('Movies');
  }

}
