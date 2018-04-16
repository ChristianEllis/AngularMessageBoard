//Library Imports
import { Component, OnInit } from '@angular/core';

//Custom Services
import { MessageService } from './message.service';

//Custom Components
import { Message } from './message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: 'message-list.component.html'
  //providers: [MessageService] Use this to have more than one instance
})
export class MessageListComponent implements OnInit {
  messages:Message[] = []

  constructor(private messageService: MessageService) {

  }

  ngOnInit() {
    this.messageService.getMessages()
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        });
  }
}
