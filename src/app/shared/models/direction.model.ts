export class DirectionModel {
  origin: string;
  destination: string;
  mode: string;

  constructor(data: any = {}) {
    this.origin = data.origin || '';
    this.destination = data.destination || '';
    this.mode = data.mode || 'DRIVING';
  }
}
