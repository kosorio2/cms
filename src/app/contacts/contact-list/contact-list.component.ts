import { Component, OnInit} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  //SelectedEvent is a custom event that can be used to listen
  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];
    // new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg'),
    // new Contact('2', 'Rex Barzee', 'barzeerk@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg')

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
    //This needs to be included so that the parent can listen
  }

}



//The constructor runs first, then ngOnInit
