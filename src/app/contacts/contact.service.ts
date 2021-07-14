import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model'



@Injectable({
  providedIn: 'root'
}) //This makes this service available all over the app

export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;

  //contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    //this.getContacts();
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http.get('https://cms-app-7f767-default-rtdb.firebaseio.com/contacts.json')
    .subscribe(
      (contacts: any) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId()


        this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
        this.contactListChangedEvent.next(this.contacts.slice()); //this creates a copy
      },

    (error: any) => {
      console.log(error);
    }
    )
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

    this.storeContact();

    // const contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);

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

    this.storeContact();

    // let contactsListClone = this.contacts.slice()
    // this.contactChangedEvent.next(contactsListClone)
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

    this.storeContact();
    // let contactListClone = this.contacts.slice()
    // this.contactChangedEvent.next(contactListClone)
  }

  storeContact() {
    let dataContacts = JSON.stringify(this.contacts); //This converts the data into a JSON file
    let contactHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://cms-app-7f767-default-rtdb.firebaseio.com/contacts.json', dataContacts, {headers: contactHeader}).subscribe(() => {
    this.contactListChangedEvent.next(this.contacts.slice());
  })
  }

}
