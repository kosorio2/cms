import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor() { }

  //SelectedEvent is a custom event that can be used to listen
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg'),
    new Contact('2', 'Rex Barzee', 'barzeerk@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg')
  ];

  ngOnInit(): void {
  }

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
    //This needs to be included so that the parent can listen 
  }

}
