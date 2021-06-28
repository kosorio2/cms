import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})

export class DocumentEditComponent implements OnInit {
  originalDocument: Document; //This is the unedited version of the document
  document: Document;
  editMode: boolean = false;


  constructor(
  private documentService: DocumentService,
  private router: Router,
  private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => { //This is getting the ID
        const id = params['id'];

        if (!id) { //If id parameter is undefined or null
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(id);

        if (!this.originalDocument) {
          return;
        }

        this.editMode = true;
        // this.document = this.originalDocument; //Is this the clone?
        this.document = JSON.parse(JSON.stringify(this.originalDocument));


      });
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {

    const values = form.value;

    const newDocument = new Document(null, values.name, values.description, values.documentUrl, null);

    if (this.editMode == true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

}
