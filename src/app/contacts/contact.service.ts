import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

import { Contact } from './contact.model'

import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
}) //This makes this service available all over the app

export class ContactService {
  private contacts: Contact[] = [];
  maxContactId: number;

  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts
    .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice(); //this creates a copy
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const position = this.contacts.indexOf(contact);

    if (position < 0) {
      return;
    }

    this.contacts.splice(position, 1);

    const contactsListClone = this.contacts.slice();

    this.contactChangedEvent.next(contactsListClone);

  }

  getMaxId(): number {
    let maxId = 0;

    for(let contact of this.contacts) { //This loops through the given list
      let currentId = +contact.id; //The plus changes the string into a number

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === undefined || newContact === null) {
        return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    let contactsListClone = this.contacts.slice()
    this.contactChangedEvent.next(contactsListClone)
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact === undefined || originalContact === null || newContact === undefined || newContact === null) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactListClone = this.contacts.slice()
    this.contactChangedEvent.next(contactListClone)
  }

}
