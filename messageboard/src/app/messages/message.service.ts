//Library Imports
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

//Custom Services
import { ErrorService } from '../errors/error.service';

//Custom Components
import { Message } from './message.model';

@Injectable()
export class MessageService {
  private messages: Message[] = [];
  messageIsEdit = new EventEmitter<Message>();
  //need http module and injectable
  constructor(private http: Http, private errorService: ErrorService) {
  }

  addMessage(message:Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token') //setup query string to send on each request
      : '';
    return this.http.post('http://localhost:3000/message' + token, body, {headers: headers}) //setup an observable, must be subscribed by component
      .map((response: Response) => {
        const result = response.json();
        const message = new Message(
          result.obj.content,
          result.username, //username
          result.obj._id, //message id
          result.obj.user //userid
        );
        this.messages.push(message);
        return message;
      }) //get rid of headers and only take data with json
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      }); //turn into observable then throw error
  }

  getMessages() {
    return this.http.get('http://localhost:3000/message')
      .map( (response:Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for(let message of messages) {
          transformedMessages.push(new Message(
            message.content,
            message.user.fName, //get from extension in backend
            message._id,
            message.user._id));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      }); //turn into observable then throw error
  }

  editMessage(message: Message){
    this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message){
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token') //setup query string to send on each request
    : '';
    return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers}) //setup an observable, must be subscribed by component
      .map((response: Response) => response.json()) //get rid of headers and only take data with json
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      }); //turn into observable then throw error
  }
  deleteMessage(message:Message) {
    this.messages.splice(this.messages.indexOf(message), 1) //remove the message that is passed from front end
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token') //setup query string to send on each request
    : '';
    return this.http.delete('http://localhost:3000/message/' + message.messageId + token) //setup an observable, must be subscribed by component
      .map((response: Response) => response.json()) //get rid of headers and only take data with json
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      }); //turn into observable then throw error
  }

}
