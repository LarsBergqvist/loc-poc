import { Message } from './message';
import { Place } from '../models/place';

export class OpenPlaceDetailsMessage extends Message {
  place: Place;
  constructor(place: Place) {
    super();
    this.place = place;
  }

  get Type(): string {
    return 'OpenPlaceDetailsMessage';
  }
}
