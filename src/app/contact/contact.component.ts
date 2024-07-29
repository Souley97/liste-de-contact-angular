import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Déclaration de l'interface Contact
interface Contact {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  etat: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  description: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'] // Correction de "styleUrl" en "styleUrls"
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  trash: Contact[] = [];
  searchTerm: string = '';
  isAddContactPopupOpen: boolean = false;
  isTrashPopupOpen: boolean = false;
  editingContactId: number | null = null;
  contact: Contact = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    etat: 'active',
    createdAt: new Date(),
    createdBy: 'user',
    updatedAt: new Date(),
    updatedBy: 'user',
    description: ''
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadContacts();
    }
  }

  loadContacts() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        this.trash = JSON.parse(localStorage.getItem('trash') || '[]');
      } catch (e) {
        console.error('Erreur lors du chargement des contacts:', e);
        this.contacts = [];
        this.trash = [];
      }
    }
  }

  addContact() {
    if (!this.validateContact(this.contact)) {
      alert('Veuillez vérifier les informations du contact.');
      return;
    }

    if (this.editingContactId !== null) {
      const index = this.contacts.findIndex(c => c.id === this.editingContactId);
      if (index !== -1) {
        this.contact.updatedAt = new Date();
        this.contact.updatedBy = 'user';
        this.contacts[index] = this.contact;
      }
    } else {
      this.contact.id = new Date().getTime();
      this.contact.createdAt = new Date();
      this.contact.updatedAt = new Date();
      this.contacts.push(this.contact);
    }

    this.saveContacts();
    alert('Contact ajouté ou modifié avec succès');
    this.resetForm();
    this.closeAddContactPopup();
  }

  validateContact(contact: Contact): boolean {
    // Exemple de validation simple
    return contact.nom.trim() !== '' &&
           contact.email.trim() !== '' &&
           contact.telephone.trim() !== '';
  }

  resetForm() {
    this.contact = {
      id: 0,
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      etat: 'active',
      createdAt: new Date(),
      createdBy: 'user',
      updatedAt: new Date(),
      updatedBy: 'user',
      description: ''
    };
    this.editingContactId = null;
  }

  deleteContact(contactId: number) {
    const contactIndex = this.contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex !== -1) {
      this.trash.push(this.contacts[contactIndex]);
      this.saveTrash();
      this.contacts.splice(contactIndex, 1);
      this.saveContacts();
    }
  }

  restoreContact(contactId: number) {
    const contactIndex = this.trash.findIndex(contact => contact.id === contactId);
    if (contactIndex !== -1) {
      this.contacts.push(this.trash[contactIndex]);
      this.saveContacts();
      this.trash.splice(contactIndex, 1);
      this.saveTrash();
    }
  }

  viewDetails(contactId: number) {
    const contact = this.contacts.find(contact => contact.id === contactId);
    if (contact) {
      alert(`Détails du contact:\nNom: ${contact.nom}\nPrénom: ${contact.prenom}\nEmail: ${contact.email}\nTéléphone: ${contact.telephone}\nDescription: ${contact.description}`);
    }
  }

  editContact(contactId: number) {
    const contact = this.contacts.find(contact => contact.id === contactId);
    if (contact) {
      this.contact = { ...contact };
      this.editingContactId = contactId;
      this.openAddContactPopup();
    }
  }

  searchContacts() {
    const term = this.searchTerm.toLowerCase();
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]').filter((contact: Contact) =>
          contact.nom.toLowerCase().includes(term) || contact.telephone.includes(term)
        );
      } catch (e) {
        console.error('Erreur lors de la recherche des contacts:', e);
        this.contacts = [];
      }
    }
  }

  openAddContactPopup() {
    this.isAddContactPopupOpen = true;
  }

  closeAddContactPopup() {
    this.isAddContactPopupOpen = false;
  }

  openTrashPopup() {
    this.isTrashPopupOpen = true;
  }

  closeTrashPopup() {
    this.isTrashPopupOpen = false;
  }

  private saveContacts() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
      } catch (e) {
        console.error('Erreur lors de la sauvegarde des contacts:', e);
      }
    }
  }

  private saveTrash() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('trash', JSON.stringify(this.trash));
      } catch (e) {
        console.error('Erreur lors de la sauvegarde de la corbeille:', e);
      }
    }
  }
}
