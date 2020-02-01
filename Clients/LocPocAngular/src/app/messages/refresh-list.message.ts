import { Message } from './message';

export class RefreshListMessage extends Message {
    constructor() {
        super();
    }

    get Type(): string {
        return 'RefreshListMessage';
    }
}
