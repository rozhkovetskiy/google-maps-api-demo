export class DirectionModel {
  origin: string;
  destination: string;
  mode: string;

  constructor (data?: any) {
    this.origin =  data ? data.origin : '';
    this.destination =  data ? data.destination : '';
    this.mode = 'DRIVING';
  }
}
