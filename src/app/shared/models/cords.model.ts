export class CordsModel {
  lat: number;
  lon: number;

  constructor (data?: any) {
    this.lat = data.latitude || 0;
    this.lon = data.longitude || 0;
  }
}
