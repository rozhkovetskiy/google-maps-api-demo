export class PlaceIDsModel {
  origin: string;
  destination: string;

  constructor (data?: any) {
    this.origin = data ? data.origin : '';
    this.destination = data ? data.destination : '';
  }
}
