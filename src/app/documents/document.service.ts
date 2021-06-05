import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model'

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocument(id: string) {
    return this.documents.find((document) => document.id === id);
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
}

getMaxId(): number {
  let maxId = 0;

  for(let document of this.documents) { //This loops through the given list
    let currentId = +document.id; //The plus changes the string into a number

    if (currentId > maxId) {
      maxId = currentId;
    }
  }

  return maxId;
}

addDocument(newDocument: Document) {
  if (newDocument === undefined || newDocument === null) {
      return;
  }

  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);

  let documentsListClone = this.documents.slice()
  this.documentChangedEvent.next(documentsListClone)
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (originalDocument === undefined || originalDocument === null || newDocument === undefined || newDocument === null) {
    return;
  }

  let pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
      return;
  }

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  let documentsListClone = this.documents.slice()
  this.documentChangedEvent.next(documentsListClone)
}
}
