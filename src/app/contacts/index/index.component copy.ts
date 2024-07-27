import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Contact } from '../create/create.component';
import swal from 'sweetalert';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  contacts: Contact[] = [];
  userContacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  currentUserId: number | null = null;
  searchText: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Récupérer les contacts depuis le localStorage
    this.contacts = this.getContacts();
    this.filteredContacts = this.contacts;

    // Récupérer l'utilisateur actuel
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserId = currentUser.id || null;

    // Filtrer les contacts par l'utilisateur actuel
    if (this.currentUserId !== null) {
      this.userContacts = this.contacts.filter(contact => contact.createdBy === this.currentUserId && contact.etat === 'actif');
    }

    this.filterContacts();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem('contacts') || '[]');
  }

  softDeleteContact(contactId: number): void {
    const contacts: Contact[] = this.getContacts();
    const index = contacts.findIndex(c => c.id === contactId);
    if (index !== -1) {
      swal({
        title: "Es-tu sûr?",
        text: "Vous voulez supprimer ce contact ?",
        icon: "warning",
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          contacts[index].etat = 'inactif';
          contacts[index].updatedAt = new Date();
          contacts[index].updatedBy = this.currentUserId!;

          localStorage.setItem('contacts', JSON.stringify(contacts));

          // Mettre à jour les listes userContacts et filteredContacts
          this.userContacts = this.userContacts.filter(contact => contact.id !== contactId);
          this.filterContacts(); // Mettre à jour la liste filtrée

          swal("Le contact a été supprimé avec succès!", {
            icon: "success",
          });
        }
      });
    }
  }

  filterContacts(): void {
    if (!this.searchText) {
      this.filteredContacts = this.userContacts;
      return;
    }

    const lowerCaseSearchText = this.searchText.toLowerCase();

    this.filteredContacts = this.userContacts.filter(contact =>
      contact.nom.toLowerCase().includes(lowerCaseSearchText) ||
      contact.prenom.toLowerCase().includes(lowerCaseSearchText) ||
      contact.email.toLowerCase().includes(lowerCaseSearchText) ||
      contact.telephone.toLowerCase().includes(lowerCaseSearchText)
    );
  }
}