import { Message } from './message';

export class AddNewPlaceMessage extends Message {
  constructor() {
    super();
  }

  get Type(): string {
    return 'AddNewPlaceMessage';
  }
}
