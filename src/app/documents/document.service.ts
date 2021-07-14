import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model'



@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new Subject<Document>();
  // documentChangedEvent = new Subject<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.getDocuments();
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http.get('https://cms-app-7f767-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      // success method
      (documents: any) => { //This wont let me do Document[]
         this.documents = documents
         this.maxDocumentId = this.getMaxId()

         this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0)
         this.documentListChangedEvent.next(this.documents.slice());
      },
      // error method
      (error: any) => {
         console.log(error)
      }
    )
  }

  getDocument(id: string) {
    return this.documents.find((document) => document.id === id);
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

    this.storeDocument();
    // const documentsListClone = this.documents.slice();
    // this.documentChangedEvent.next(documentsListClone);
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
  if (!newDocument) { //This looks for it not being undefined or null
      return;
  }

  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);

  this.storeDocument();

  // let documentsListClone = this.documents.slice()
  // this.documentChangedEvent.next(documentsListClone)
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

  this.storeDocument();
  // let documentsListClone = this.documents.slice()
  // this.documentChangedEvent.next(documentsListClone)
}


storeDocument() {
  let data = JSON.stringify(this.documents); //This converts the data into JSON file
  let httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  this.http.put('https://cms-app-7f767-default-rtdb.firebaseio.com/documents.json', data, {headers: httpHeader}).subscribe(() => {
    this.documentListChangedEvent.next(this.documents.slice());
  })
}
}
