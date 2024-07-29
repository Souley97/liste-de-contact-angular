// create.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  contacts: Contact[] = [];
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
  showForm: boolean = false;

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
        console.log('Contacts chargés:', this.contacts);
      } catch (e) {
        console.error('Erreur lors du chargement des contacts:', e);
        this.contacts = [];
      }
    }
  }

  addContact() {
    console.log('Formulaire soumis', this.contact);
    if (!this.validateContact(this.contact)) {
      alert('Veuillez vérifier les informations du contact.');
      return;
    }

    this.contact.id = new Date().getTime();
    this.contact.createdAt = new Date();
    this.contact.updatedAt = new Date();
    this.contacts.push(this.contact);
    this.saveContacts();
    alert('Contact ajouté avec succès');
    this.resetForm();
    this.cancelForm(); // Ferme le formulaire après ajout
  }

  validateContact(contact: Contact): boolean {
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
  }

  cancelForm() {
    this.showForm = false;
  }

  private saveContacts() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        console.log('Contacts sauvegardés:', this.contacts);
      } catch (e) {
        console.error('Erreur lors de la sauvegarde des contacts:', e);
      }
    }
  }
}
