import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Contact } from '../create/create.component';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})

export class IndexComponent implements OnInit {
  contacts: Contact[] = [];
  userContacts: Contact[] = [];
  currentUserId: number | null = null;


  constructor(private router: Router) {}


  ngOnInit(): void {
    // Récupérer les contacts depuis le localStorage
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts = storedContacts;

    // Récupérer l'utilisateur actuel
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserId = currentUser.id || null;

    // Filtrer les contacts par l'utilisateur actuel
    if (this.currentUserId !== null) {
      this.userContacts = this.contacts.filter(contact => contact.createdBy === this.currentUserId && contact.etat === 'actif');
    }
  }

   // Méthode pour déconnecter l'utilisateur
   logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
