import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasAGroup: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];

        if(!id) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(id);

        if (!this.originalContact) {
          return;
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.originalContact.group && this.originalContact.group.length > 0) {
          //groupContacts = clone
          this.hasAGroup = true;
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));

        }

      });
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const newContact = new Contact('', values.name, values.email, values.phone, values.imageUrl, this.groupContacts);

    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number) {
    if(index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);

  } //The index position of the contact array is passed to the method, if the index is outside the range, then the method exits

  isInvalidContact(newContact: Contact) {
    if(!newContact) { // newContact has no value
      return true;
    }
    if(this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for(let i=0; i < this.groupContacts.length;i++) {
      if(newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  } //This method first determines if a new contact was passed to the method. If no contact was passed, it exits the method


  //When a <cms-contact-item> tag is dragged and dropped into this drop zone, the onDropSuccess
  //event is fired and the addToGroup() method is called and passed the $event. The $event argument contains a reference
  //to the onDropSuccess event that contains the dragData passed with the element dragged into the drop zone.

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if(invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  //This method first gets the dragData from $event passed into the method, and assigns it to the selectedContact variable.
  //The isInvalidContact() method is then called to determine if the selectedContact is already in the group. If the contact
  // is already in the group, the method exits.



}
