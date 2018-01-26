import { Component, OnInit } from '@angular/core';
import { CordsModel } from '../shared/models/cords.model';
import { DirectionModel } from '../shared/models/direction.model';


import { GoogleMapsService } from '../shared/services/google-maps.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public cords: CordsModel;
  public iframeUrl: SafeResourceUrl;
  public direction = new DirectionModel();

  public autocomplete = {
    origin: [],
    destination: []
  };
  public placeIDs = {
    origin: '',
    destination: ''
  };

  public placeInformation = {
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
    this.getPlaceInfo(type);
  }

  public getMap(cords: CordsModel) {
    this.iframeUrl =  this.googleMapsService.getMap(cords);
  }

  public getDirectionMap() {
    if (this.direction.origin && this.direction.destination) {
      this.iframeUrl = this.googleMapsService.getDirectionMap(this.direction);
    }
  }

  public getAutocomplite (param: string) {
    this.googleMapsService.autocomplitePlace(this.direction[param])
      .subscribe((response) => {
        if (response.status === 'OK') {
          this.autocomplete[param] = response.predictions;
        } else {
          this.autocomplete[param] = [];
        }
      });
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
