import { Component, OnInit, Inject } from '@angular/core';
import { MessageBrokerService } from './services/message-broker.service';
import { filter, takeUntil } from 'rxjs/operators';
import { LocationsService } from './services/locations.service';
import { ErrorOccurredMessage } from './messages/error-occurred.message';
import { SuccessInfoMessage } from './messages/success-info.message';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private unsubsribe$ = new Subject();

    constructor(
        private readonly messageService: MessageBrokerService,
        @Inject('LocationsService') private readonly locationsService: LocationsService,
        private readonly primeNGmessageService: MessageService
    ) {}

    ngOnInit(): void {
        const messages = this.messageService.getMessage();

        messages
            .pipe(
                takeUntil(this.unsubsribe$),
                filter((message) => message instanceof ErrorOccurredMessage)
            )
            .subscribe((message: ErrorOccurredMessage) => {
                this.primeNGmessageService.add({ severity: 'error', summary: 'Error', detail: message.errorMessage });
            });

        messages
            .pipe(
                takeUntil(this.unsubsribe$),
                filter((message) => message instanceof SuccessInfoMessage)
            )
            .subscribe((message: SuccessInfoMessage) => {
                this.primeNGmessageService.add({ severity: 'success', summary: 'Success', detail: message.info });
            });
    }
}
