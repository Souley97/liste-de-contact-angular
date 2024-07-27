import { Component, OnInit } from '@angular/core';
import { Contact } from '../create/create.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';


@Component({
  selector: 'app-corbeille',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './corbeille.component.html',
  styleUrl: './corbeille.component.css'
})
export class CorbeilleComponent implements OnInit {
  contacts: Contact[] = [];
  userContacts: Contact[] = [];
  currentUserId: number | null = null;
  currentUser: any = null;


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
      this.userContacts = this.contacts.filter(contact => contact.createdBy === this.currentUserId && contact.etat === 'inactif');
    }
    // Récupérer l'utilisateur connecté depuis localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    } else {
      // Rediriger vers la page de login si non connecté
      this.router.navigate(['/login']);
    }
  
  }


    
   // Méthode pour déconnecter l'utilisateur
   logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem('contacts') || '[]');
  }
  // Méthode pour effectuer une suppression logique d'un contact
  restorContact(contactId: number): void {
  const contacts: Contact[] = this.getContacts();
  const index = contacts.findIndex(c => c.id === contactId);
  
  if (index !== -1) {
    swal({
      title: "Restaurer ce contact?",
      text: "Vous allez restaurer ce contact.",
      icon: "warning",
      buttons: ["Annuler", "Oui, restaurer"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        // Mettre à jour l'état du contact
        contacts[index].etat = 'actif';
        contacts[index].updatedAt = new Date();
        contacts[index].updatedBy = this.currentUserId!;

        // Sauvegarder les modifications dans le localStorage
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Mettre à jour la liste des contacts affichés
        this.userContacts = this.userContacts.filter(contact => contact.id !== contactId);

        swal("Le contact a été restauré avec succès!", {
          icon: "success",
        });
      } else {
        swal("Le contact est en sécurité!", {
          icon: "info",
        });
      }
    });
  }
}

}
