import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
}

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: number = 0;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  etat: string = 'inactif'; // Valeur par défaut
  description: string = '';
  errorMessage: string = '';
  currentUserId: number | null = null;
  currentUser: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté depuis localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.currentUserId = this.currentUser?.id || null;
    } else {
      // Rediriger vers la page de login si non connecté
      this.router.navigate(['/login']);
    }

    // Récupérer l'ID du contact à partir des paramètres de la route
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.loadContact();
    });
  }

  loadContact(): void {
    const contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contact = contacts.find(c => c.id === this.id);
    if (contact) {
      this.nom = contact.nom;
      this.prenom = contact.prenom;
      this.email = contact.email;
      this.telephone = contact.telephone;
      this.etat = contact.etat;
      this.description = contact.description || '';
    } else {
      this.errorMessage = 'Contact non trouvé.';
    }
  }

  updateContact(): void {
    if (this.nom === '' || this.prenom === '' || this.email === '' || this.telephone === '') {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    if (this.currentUserId === null) {
      this.errorMessage = 'Utilisateur non connecté.';
      return;
    }

    const contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contactIndex = contacts.findIndex(c => c.id === this.id);
    if (contactIndex !== -1) {
      contacts[contactIndex] = {
        ...contacts[contactIndex],
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        telephone: this.telephone,
        etat: this.etat,
        updatedAt: new Date(),
        updatedBy: this.currentUserId,
        description: this.description
      };

      localStorage.setItem('contacts', JSON.stringify(contacts));

      // Réinitialiser le formulaire après mise à jour
      this.nom = '';
      this.prenom = '';
      this.email = '';
      this.telephone = '';
      this.description = '';

      // Rediriger vers la liste des contacts
      this.router.navigate(['/contacts']);
    } else {
      this.errorMessage = 'Contact non trouvé.';
    }
  }
}
