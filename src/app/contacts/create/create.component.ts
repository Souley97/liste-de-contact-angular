import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export interface Contact {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  etat: string;
  createdAt: Date;
  createdBy: number;
  updatedAt?: Date;
  updatedBy: number;
  description?: string;
  userName?: string; // Nom de l'utilisateur qui a ajouté le contact
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
    createdBy: 0,
    updatedAt: new Date(),
    updatedBy: 0,
    description: '',
    userName: ''
  };
  showForm: boolean = false;
  editMode: boolean = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadContacts(); // Charger les contacts depuis localStorage
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

  openForm() {
    this.showForm = true;
    this.resetForm();
    this.editMode = false;
  }

  addContact() {
    console.log('Formulaire soumis', this.contact);
    if (!this.validateContact(this.contact)) {
      alert('Veuillez vérifier les informations du contact.');
      return;
    }

    this.contact.id = new Date().getTime(); // Générer un ID unique
    this.contact.createdAt = new Date();
    this.contact.updatedAt = new Date();
    this.contact.createdBy = this.getUserId(); // Ajouter l'identifiant de l'utilisateur
    this.contact.updatedBy = this.getUserId(); // Ajouter l'identifiant de l'utilisateur
    this.contact.userName = this.getUserName(); // Ajouter le nom de l'utilisateur
    this.contacts.push(this.contact);
    this.saveContacts();
    alert('Contact ajouté avec succès');
    this.resetForm();
    this.cancelForm(); // Ferme le formulaire après ajout
  }

  editContact(contact: Contact) {
    this.contact = { ...contact };
    this.showForm = true;
    this.editMode = true;
  }

  updateContact() {
    console.log('Formulaire modifié', this.contact);
    if (!this.validateContact(this.contact)) {
      alert('Veuillez vérifier les informations du contact.');
      return;
    }

    const index = this.contacts.findIndex(c => c.id === this.contact.id);
    if (index !== -1) {
      this.contacts[index] = { ...this.contact, updatedAt: new Date(), updatedBy: this.getUserId() };
      this.saveContacts();
      alert('Contact modifié avec succès');
      this.resetForm();
      this.cancelForm(); // Ferme le formulaire après modification
    }
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
      createdBy: 0,
      updatedAt: new Date(),
      updatedBy: 0,
      description: '',
      userName: ''
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

  // Méthode pour obtenir l'identifiant de l'utilisateur connecté
  private getUserId(): number {
    // Remplacez ceci par votre logique pour obtenir l'identifiant utilisateur réel
    return 123; // Exemple d'ID utilisateur
  }

  // Méthode pour obtenir le nom de l'utilisateur connecté
  private getUserName(): string {
    // Remplacez ceci par votre logique pour obtenir le nom utilisateur réel
    return 'Utilisateur Test'; // Exemple de nom d'utilisateur
  }
}
