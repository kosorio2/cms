import { Message } from '../message.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Subject Title', 'Message Text', 'Kathy Osorio'),
    new Message('2', 'Subject Title', 'Message Text', 'Kathy Osorio')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
