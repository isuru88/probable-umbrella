import { Component, OnInit } from '@angular/core';
import { ContentDataService } from 'src/app/services/content-data.service';
import { Category } from 'src/app/models/category';
import { TitleService } from 'src/app/services/title.service';


@Component({

  selector: 'app-content-feed',
  templateUrl: './content-feed.component.html',
  styleUrls: ['./content-feed.component.css'],
  providers: []
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

      // The following section is a hacky way to update the carousel arrows based on the browser window size.
      if (category.assets && category.assets.length > this.maxSlides) {
        this.maxSlides = category.assets.length;

        const cardWidth = 220;
        const responsive = [];

        // The slick carousel configuration has a responsive object array which defines a set of breakpoints for
        // when the carousel needs to start overflowing. In here we're creating a breakpoint for the width of each card.
        // Because of this logic, the carousel will show the arrows soon as the card on the far right is overflowing.
        for (let index = 1; index <= this.maxSlides + 1; index++) {
          responsive.push({
            breakpoint: cardWidth * index,
            settings: {
              slidesToShow: index,
              slidesToScroll: 1
            }
          });
        }

        this.slideConfig.slidesToShow = this.maxSlides;
        this.slideConfig.responsive = responsive;
      }
    });

    this.titleService.setTitle('Movies');
  }

}
