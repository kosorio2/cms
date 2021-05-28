import { Injectable } from '@angular/core';
import { Message } from '../message.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages(); 
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
