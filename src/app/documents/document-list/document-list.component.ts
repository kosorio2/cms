import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';

import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  documentId: string = '';
  private subscription: Subscription

  constructor(private documentService: DocumentService) {
    // this.documents = this.documentService.getDocuments(); - Why does this give me an error?
  }

  ngOnInit() {
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    }); //This takes the documents as a parameter
    this.documentService.getDocuments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }



  // onSelectedDocument(document: Document) {
  //   this.documentService.documentSelectedEvent.emit(document);
  // }

}
