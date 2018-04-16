//Library Imports
import { Component, Input } from '@angular/core';

//Custom Services
import { MessageService } from './message.service';

//Custom Components
import { Message } from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles:[`
  .author {
    display: inline-block;
    font-style: italic;
    font-size: 12px;
    width: 80%;
  }
  .config {
      display: inline-block;
      text-align: right;
      font-size: 12px;
      width: 19%;
  }
  `]
})

export class MessageComponent {
  @Input() message: Message;

  constructor(private messageService: MessageService) {
  }

  color = 'red';

  onEdit() {
    this.messageService.editMessage(this.message);
  }

  onDelete(){
    this.messageService.deleteMessage(this.message)
      .subscribe(
        result => console.log(result)
      );
  }

  belongsToUser() {
    return localStorage.getItem('userId') == this.message.userId; //dont forget to to do this on backend too
  }

}
