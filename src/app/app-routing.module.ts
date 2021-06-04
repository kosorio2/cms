import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentsComponent } from "./documents/documents.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";

const appRoutes: Routes = [
   { path: '', redirectTo: '/documents', pathMatch: 'full'},
   { path: 'documents', component: DocumentsComponent, children: [
     { path: 'new', component: DocumentEditComponent}, //This will load the new document through edit button
     { path: ':id', component: DocumentDetailComponent}, //
     { path: ':id/edit', component: DocumentEditComponent} //This allows access to the ID
   ]},
   { path: 'messages', component: MessageListComponent},
   { path: 'contacts', component: ContactsComponent, children: [
    { path: 'new', component: ContactEditComponent},
    { path: ':id', component: ContactDetailComponent},
    { path: ':id/edit', component: ContactEditComponent}
   ]}
 ];

 @NgModule({
   imports: [RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
 })

export class AppRoutingModule {

}
