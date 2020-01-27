import { Message } from './message';
import { Place } from '../models/place';

export class SavePlaceMessage extends Message {
  place: Place;
  addNew: boolean;
  constructor(place: Place, addNew: boolean) {
    super();
    this.place = place;
    this.addNew = addNew;
  }

  get Type(): string {
    return 'SavePlaceMessage';
  }
}
