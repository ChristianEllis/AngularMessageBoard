//Library Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

//Custom Services
import { MessageService } from './message.service';

//Custom Components
import { MessageComponent } from './message.component';
import { MessageListComponent } from './message-list.component';
import { MessageInputComponent } from './message-input.component';
import { MessagesComponent } from './messages.component';

@NgModule({
  declarations: [
    MessageComponent,
    MessageListComponent,
    MessageInputComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [MessageService] // all its child components share the same instance of message services
})
export class MessageModule {

}
