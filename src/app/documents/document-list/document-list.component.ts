import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model'

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  constructor() { }

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'CIT 262 - Object Oriented Programming', 'Class about learning Object Oriented Programming. You will learn how to program using classes', 'objectorientedprogramming.org'),
    new Document('2', 'WDD 430 - Web Design and Development', 'In this class you will learn about Angular and Mongo DB. You will be able to complete your own website by the end of the course', 'https://byui.instructure.com'),
    new Document('3', 'CIT 495 - Senior Practicum', 'This class will help you complete your senior project', 'seniorpracticum.org')
  ];

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
