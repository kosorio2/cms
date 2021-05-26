import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model'
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
}) //This makes this service available all over the app

export class ContactService {
  private contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts
    .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice(); //this creates a copy
  }

  // getContact(id: string): Contact {
  //   return this.contacts.find((contact) => contact.id === id);
  // }
}
