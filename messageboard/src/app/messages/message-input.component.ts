//Library Imports
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//Custom Services
import { MessageService } from './message.service';

//Custom Components
import { Message } from './message.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  //providers: [MessageService] Use this to have more than one instance
})

export class MessageInputComponent implements OnInit{
  message: Message;

  constructor(private messageService: MessageService) {

  }

  ngOnInit(){
    this.messageService.messageIsEdit.subscribe(
        (message: Message) => this.message = message
    );
  }
  onClear(form:NgForm) {
    this.message = null;
    form.resetForm();
  }
  //template driven approach
  onSubmit(form: NgForm) {
    //Editing
    if(this.message) {
      this.message.content = form.value.content;
      this.messageService.updateMessage(this.message)
        .subscribe(
          result => console.log(result)
        )
      this.message = null; //do this so that ngmodel doesnt show value of message
    } else { //Creating
      const newMessage: Message = new Message(form.value.content, '');
      this.messageService.addMessage(newMessage)
        .subscribe(
          //success, once the observable starts
          data => console.log(data),
          //error
          error => console.log(error)
          //complete, once the observable is done
        );
    }
    form.resetForm();
  }
}
