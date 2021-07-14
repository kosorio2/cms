import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter  } from '@angular/core';
import { Subject } from 'rxjs';


import { Message } from './message.model'
import { MOCKMESSAGES } from './MOCKMESSAGES'

@Injectable({
  providedIn: 'root'
}) //This makes it so that it is available to the entire app
export class MessageService {
  messageListChangedEvent = new Subject<Message[]>();

  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.getMessages();
   }

   getMessages() {
    this.http.get('https://cms-app-7f767-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      // success method
      (messages: any) => { //This wont let me do Document[]
        this.messages = messages;
        this.maxMessageId = this.getMaxId();

        this.messages.sort((a, b) => a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0)
        this.messageListChangedEvent.next(this.messages.slice());
   },
   (error: any) => {
     console.log(error)
    }
    )
  }

   addMessage(message: Message) {
     this.messages.push(message);

     this.storeMessages();

   }

   getMessage(id: string): Message {
     return this.messages.find((message) => message.id === id);
   }

   getMaxId(): number {
     let maxId = 0;

     for(let message of this.messages) {
       let currentId = +message.id;

       if (currentId > maxId) {
         maxId = currentId;
       }
     }
     return maxId;
   }

   storeMessages() {
    let data = JSON.stringify(this.messages); //This converts the data into JSON file
    let httpHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://cms-app-7f767-default-rtdb.firebaseio.com/messages.json', data, {headers: httpHeader}).subscribe(() => {
      this.messageListChangedEvent.next(this.messages.slice());
    })
  }
  }



