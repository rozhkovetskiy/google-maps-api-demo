import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

import { GoogleMapsService } from '../shared/services/google-maps.service';

import { PlaceIDsModel } from '../shared/models/placeIDs.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, OnChanges {

  public placeInformation = {
    origin: [],
    destination: []
  };

  @Input() placeIDs: PlaceIDsModel;

  constructor(private googleMapsService: GoogleMapsService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  private getPlaceInfo(type: string) {
    this.googleMapsService.getPlaceInformation(this.placeIDs[type])
      .subscribe((response) => {
        console.log('response: ');
        console.log(response);
        if (response.status === 'OK') {
          this.placeInformation[type] = response.result;
        } else {
          this.placeInformation[type] = [];
        }
        console.log(this.placeInformation[type]);
      });
  }

}
