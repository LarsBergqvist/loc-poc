import { Component } from '@angular/core';
import { MessageBrokerService } from '../services/message-broker.service';
import { AddNewLocationMessage } from '../messages/add-new-location.message';

@Component({
    selector: 'app-bar',
    templateUrl: './app-bar.component.html',
    styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {

    constructor(private readonly messageService: MessageBrokerService) { }

    addNewLocation() {
        this.messageService.sendMessage(new AddNewLocationMessage());
    }
}
