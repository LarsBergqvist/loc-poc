import { Message } from './message';
import { Location } from '../models/location';

export class SaveLocationMessage extends Message {
  location: Location;
  addNew: boolean;
  constructor(location: Location, addNew: boolean) {
    super();
    this.location = location;
    this.addNew = addNew;
  }

  get Type(): string {
    return 'SaveLocationMessage';
  }
}
