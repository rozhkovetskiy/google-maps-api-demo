import { Component, OnInit } from '@angular/core';

import { GoogleMapsService } from '../shared/services/google-maps.service';
import { ReviewsModel, WrapData } from '../shared/models/reviews.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {

  public reviewsOrigin: WrapData<ReviewsModel>;
  public reviewsDestination: WrapData<ReviewsModel>;

  constructor(private googleMapsService: GoogleMapsService) { }

  ngOnInit() {
    this.reviewsOrigin = this.googleMapsService.reviewsOrigin;
    this.reviewsDestination = this.googleMapsService.reviewsDestination;
  }

}
