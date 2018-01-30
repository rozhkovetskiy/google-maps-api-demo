export class PlaceIDsModel {
  origin: string;
  destination: string;

  constructor(data: any = {}) {
    this.origin = data.origin || '';
    this.destination = data.destination || '';
  }
}
