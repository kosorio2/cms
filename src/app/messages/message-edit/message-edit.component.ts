import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>(); //This sends the message out
  currentSender = 'Kathy Osorio'

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value; //This is what the user typed in
    const msgTextValue = this.msgText.nativeElement.value;

    const message = new Message ('1', subjectValue, msgTextValue, this.currentSender); //This creates a new message

    this.messageService.addMessage(message);
    // this.addMessageEvent.emit(message); //This sends the new message to the parent

    this.onClear();

  }
  onClear() { //This is clearing the value
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }

}
