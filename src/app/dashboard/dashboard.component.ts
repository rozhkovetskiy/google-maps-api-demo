import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { GoogleMapsService } from '../shared/services/google-maps.service';

import { CordsModel } from '../shared/models/cords.model';
import { DirectionModel } from '../shared/models/direction.model';
import { PlaceIDsModel } from '../shared/models/placeIDs.model';
import {AutocompleteModel, WrapModel} from '../shared/models/autocomplete.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public cords: CordsModel;
  public iframeUrl: SafeResourceUrl;
  public direction = new DirectionModel();

  public placeIDs = new PlaceIDsModel();

  public autocomplete: {
    origin: AutocompleteModel[],
    destination: AutocompleteModel[]
  } = {
    origin: [],
    destination: []
  };

  constructor(private googleMapsService: GoogleMapsService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.cords = new CordsModel(position.coords);
        this.getMap(this.cords);
      });
    }
  }

  public setDirection(index: number, type: string) {
    if (this.autocomplete[type].length) {
      this.direction[type] = this.autocomplete[type][index].description;
      this.placeIDs[type] = this.autocomplete[type][index].place_id;
      this.autocomplete[type] = [];
    }
  }

  public getMap(cords: CordsModel) {
    this.iframeUrl =  this.googleMapsService.getMap(cords);
  }

  public getDirectionMap() {
    if (this.direction.origin && this.direction.destination) {
      this.iframeUrl = this.googleMapsService.getDirectionMap(this.direction);
      this.googleMapsService.getPlaceInformation(this.placeIDs.origin, 'origin');
      this.googleMapsService.getPlaceInformation(this.placeIDs.destination, 'destination');
    }
  }

  public getAutocomplete(param: string) {
    this.googleMapsService.autocompletePlace(this.direction[param])
      .subscribe((response: WrapModel<AutocompleteModel>) => {
          this.autocomplete[param] = response.predictions.map(item => new AutocompleteModel(item));
      });
  }


}
