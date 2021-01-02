import { Message } from './message';

export class AddNewLocationMessage extends Message {
    constructor() {
        super();
    }

    get Type(): string {
        return 'AddNewLocationMessage';
    }
}
