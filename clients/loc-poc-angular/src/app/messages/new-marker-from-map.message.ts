import { Message } from './message';

export class NewMarkerFromMapMessage extends Message {
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number) {
        super();
        this.latitude = latitude;
        this.longitude = longitude;
    }

    get Type(): string {
        return 'NewMarkerFromMapMessage';
    }
}
