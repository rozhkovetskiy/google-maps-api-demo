export class AutocompleteModel {
  description: string;
  place_id: string;

  constructor(data: any = {}) {
    this.description = data.description || '';
    this.place_id = data.place_id || '';
  }
}

export class WrapModel<T> {
  [key: string]: T[];
}
