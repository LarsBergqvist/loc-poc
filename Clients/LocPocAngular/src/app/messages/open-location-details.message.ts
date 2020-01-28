import { Message } from './message';
import { Location } from '../models/location';

export class OpenLocationDetailsMessage extends Message {
  location: Location;
  constructor(location: Location) {
    super();
    this.location = location;
  }

  get Type(): string {
    return 'OpenLocationDetailsMessage';
  }
}
