import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  term: string;
  contacts: Contact[] = [];
  private subscription: Subscription

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts) => {
      this.contacts = contacts;
    });

    this.contactService.getContacts(); //This is loading the contacts
  }

  search(value: string) {

    this.term = value;

    }

    onKeyUp(value: string) {
      this.term = value;
    }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }



}



//The constructor runs first, then ngOnInit
