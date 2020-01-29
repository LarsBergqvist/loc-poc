import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageBrokerService } from './message-broker.service';
import { ErrorOccurredMessage } from '../messages/error-occurred.message';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private readonly messageService: MessageBrokerService) { }
  handleError(error: HttpErrorResponse, messageService: MessageBrokerService) {
    if (error && (typeof error.error === 'string')) {
      messageService.sendMessage(new ErrorOccurredMessage(error.error));
    } else if (error) {
      if (error.status === 0) {
        messageService.sendMessage(new ErrorOccurredMessage('Connection error.'));
      } else {
        messageService.sendMessage(new ErrorOccurredMessage('An error has occurred.'));
      }
    }
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError( (error) => this.handleError(error, this.messageService))
      );
  }

}
