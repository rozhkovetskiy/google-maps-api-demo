import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DomSanitizer } from '@angular/platform-browser';

import { CordsModel } from '../models/cords.model';


@Injectable()
export class GoogleMapsService {

  public reviewsOrigin: any = {data: []};
  public reviewsDestination: any = {data: []};
  private apiKey = 'AIzaSyBOsRU8IKrr4gge5B7ZQqlxITphxEMcy2g';

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }

  public getMap(cords: CordsModel) {
    const url = `https://www.google.com/maps/embed/v1/view?key=${this.apiKey}&center=${cords.lat},${cords.lon}&zoom=13`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public getDirectionMap (direction: any) {
    const url = `https://www.google.com/maps/embed/v1/directions?key=${this.apiKey}&origin=${direction.origin}
                 &destination=${direction.destination}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public autocompletePlace (input: string): Observable<any> {
    const url = '/api/place/autocomplete/json';
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('types', 'geocode')
      .set('input', input);
    return this.http.get<any>(url, {params: params});
  }

  public getPlaceInformation (placeID: string, type: string) {
    console.log(`in service`);
    const url = '/api/place/details/json';
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('placeid', placeID);
    this.http.get<any>(url, {params: params})
      .subscribe((response) => {
          console.log('in pipe');
          if (response.status === 'OK') {
            (type === 'origin') ? this.reviewsOrigin.data = response.result : this.reviewsDestination.data = response.result;
          } else {
            (type === 'origin') ? this.reviewsOrigin.data = [] : this.reviewsDestination.data = [];
          }
        }
      );
  }

}
