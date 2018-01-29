import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

import { GoogleMapsService } from '../shared/services/google-maps.service';

import { PlaceIDsModel } from '../shared/models/placeIDs.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  public placeInformation = {
    origin: [],
    destination: []
  };
  public reviewsOrigin: any;
  public reviewsDestination: any;


  constructor(private googleMapsService: GoogleMapsService) { }

  ngOnInit() {
    this.reviewsOrigin = this.googleMapsService.reviewsOrigin;
    this.reviewsDestination = this.googleMapsService.reviewsDestination;
  }

}
