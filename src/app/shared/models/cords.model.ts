export class CordsModel {
  latitude: number;
  longitude: number;

  constructor(data: any = {}) {
    this.latitude = data.latitude || 0;
    this.longitude = data.longitude || 0;
  }
}
