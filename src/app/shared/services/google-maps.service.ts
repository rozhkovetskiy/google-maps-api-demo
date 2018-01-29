import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DomSanitizer } from '@angular/platform-browser';

import { CordsModel } from '../models/cords.model';


@Injectable()
export class GoogleMapsService {

  
  private apiKey = 'AIzaSyBOsRU8IKrr4gge5B7ZQqlxITphxEMcy2g';

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }

  public getMap(cords: CordsModel) {
    const url = `https://www.google.com/maps/embed/v1/view?key=${this.apiKey}&center=${cords.lat},${cords.lon}&zoom=13`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    // return this.http.get(url, { responseType: 'text' });
  }

  public getDirectionMap (direction: any) {
    const url = `https://www.google.com/maps/embed/v1/directions?key=${this.apiKey}&origin=${direction.origin}
                 &destination=${direction.destination}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public autocomplitePlace (input: string): Observable<any> {
    const url = '/api/place/autocomplete/json';
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('types', 'geocode')
      .set('input', input);
    return this.http.get<any>(url, {params: params});
  }

  public getPlaceInformation (placeID: string): Observable<any> {
    const url = '/api/place/details/json';
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('placeid', placeID);
    return this.http.get<any>(url, {params: params});

  }


}
