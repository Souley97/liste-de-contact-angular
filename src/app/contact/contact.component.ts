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
  styleUrls: ['./contact.component.css'] 
})
export class ContactComponent implements OnInit {
  // Propriétés de la classe ContactComponent
  contacts: Contact[] = []; // Liste des contacts
  trash: Contact[] = []; // Liste des contacts supprimés
  searchTerm: string = ''; // Terme de recherche pour filtrer les contacts
  isAddContactPopupOpen: boolean = false; // État du popup d'ajout/édition de contact
  isTrashPopupOpen: boolean = false; // État du popup de la corbeille
  editingContactId: number | null = null; // Identifiant du contact en cours d'édition
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

  // Constructeur avec injection du PLATFORM_ID
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Initialisation du composant
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadContacts(); // Charger les contacts depuis le localStorage
    }
  }

  // Chargement des contacts et de la corbeille depuis le localStorage
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

  // Ajouter ou modifier un contact
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
        this.contacts[index] = this.contact; // Met à jour le contact existant
      }
    } else {
      this.contact.id = new Date().getTime(); // Assigne un nouvel ID basé sur la date
      this.contact.createdAt = new Date();
      this.contact.updatedAt = new Date();
      this.contacts.push(this.contact); // Ajoute un nouveau contact
    }

    this.saveContacts(); // Sauvegarde les contacts dans le localStorage
    alert('Contact ajouté ou modifié avec succès');
    this.resetForm(); // Réinitialise le formulaire
    this.closeAddContactPopup(); // Ferme le popup
  }

  // Validation des informations du contact
  validateContact(contact: Contact): boolean {
    return contact.nom.trim() !== '' &&
           contact.email.trim() !== '' &&
           contact.telephone.trim() !== '';
  }

  // Réinitialise le formulaire de contact
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
    this.editingContactId = null; // Réinitialise l'ID d'édition
  }

  // Supprime un contact et l'ajoute à la corbeille
  deleteContact(contactId: number) {
    const contactIndex = this.contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex !== -1) {
      this.trash.push(this.contacts[contactIndex]); // Ajoute le contact à la corbeille
      this.saveTrash(); // Sauvegarde la corbeille dans le localStorage
      this.contacts.splice(contactIndex, 1); // Supprime le contact de la liste
      this.saveContacts(); // Sauvegarde la liste des contacts dans le localStorage
    }
  }

  // Restaure un contact depuis la corbeille
  restoreContact(contactId: number) {
    const contactIndex = this.trash.findIndex(contact => contact.id === contactId);
    if (contactIndex !== -1) {
      this.contacts.push(this.trash[contactIndex]); // Ajoute le contact restauré à la liste des contacts
      this.saveContacts(); // Sauvegarde la liste des contacts dans le localStorage
      this.trash.splice(contactIndex, 1); // Supprime le contact restauré de la corbeille
      this.saveTrash(); // Sauvegarde la corbeille dans le localStorage
    }
  }

  // Affiche les détails d'un contact
  viewDetails(contactId: number) {
    const contact = this.contacts.find(contact => contact.id === contactId);
    if (contact) {
      alert(`Détails du contact:\nNom: ${contact.nom}\nPrénom: ${contact.prenom}\nEmail: ${contact.email}\nTéléphone: ${contact.telephone}\nDescription: ${contact.description}`);
    }
  }

  // Prépare un contact pour l'édition
  editContact(contactId: number) {
    const contact = this.contacts.find(contact => contact.id === contactId);
    if (contact) {
      this.contact = { ...contact }; // Copie les informations du contact à éditer
      this.editingContactId = contactId; // Définit l'ID du contact en cours d'édition
      this.openAddContactPopup(); // Ouvre le popup d'ajout/édition de contact
    }
  }

  // // Recherche des contacts basés sur le terme de recherche
  // searchContacts() {
  //   const term = this.searchTerm.toLowerCase();
  //   if (isPlatformBrowser(this.platformId)) {
  //     try {
  //       this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]').filter((contact: Contact) =>
  //         contact.nom.toLowerCase().includes(term) || contact.telephone.includes(term)
  //       );
  //     } catch (e) {
  //       console.error('Erreur lors de la recherche des contacts:', e);
  //       this.contacts = [];
  //     }
  //   }
  // }

  // Ouvre le popup d'ajout/édition de contact
  openAddContactPopup() {
    this.isAddContactPopupOpen = true;
  }

  // Ferme le popup d'ajout/édition de contact
  closeAddContactPopup() {
    this.isAddContactPopupOpen = false;
  }

  // Ouvre le popup de la corbeille
  openTrashPopup() {
    this.isTrashPopupOpen = true;
  }

  // Ferme le popup de la corbeille
  closeTrashPopup() {
    this.isTrashPopupOpen = false;
  }

  // Sauvegarde les contacts dans le localStorage
  private saveContacts() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
      } catch (e) {
        console.error('Erreur lors de la sauvegarde des contacts:', e);
      }
    }
  }

  // Sauvegarde la corbeille dans le localStorage
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
