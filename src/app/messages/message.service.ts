import { Injectable, EventEmitter  } from '@angular/core';

import { Message } from './message.model'
import { MOCKMESSAGES } from './MOCKMESSAGES'

@Injectable({
  providedIn: 'root'
}) //This makes it so that it is available to the entire app
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  private messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
   }

   getMessages(): Message[] {
     return this.messages
     .sort((a, b) => a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0)
     .slice();
   }

   addMessage(message: Message) {
     this.messages.push(message);
     this.messageChangedEvent.emit(this.messages.slice())

   }

   getMessage(id: string): Message {
     return this.messages.find((message) => message.id === id);
   }
}
