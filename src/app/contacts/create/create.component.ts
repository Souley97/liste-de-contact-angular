import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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
  updatedBy?: number;
  description?: string;
}
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule ,FormsModule],
 
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  etat: string = 'inactif'; // Valeur par défaut, peut être modifiée selon les besoins
  description: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}
ngOnInit(): void {
  
}

saveContact(): void {
  if (this.nom === '' || this.prenom === '' || this.email === '' || this.telephone === '') {
    this.errorMessage = 'Veuillez remplir tous les champs.';
    return;
  }

  // Récupérer l'ID de l'utilisateur connecté depuis le sessionStorage
  const userId = sessionStorage.getItem('currentUserId');
  if (!userId) {
    this.errorMessage = 'Utilisateur non connecté.';
    return;
  }

  // Récupérer les contacts existants depuis localStorage
  const contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');

  // Créer un nouveau contact
  const newContact: Contact = {
    id: contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1, // Générer un nouvel ID
    nom: this.nom,
    prenom: this.prenom,
    email: this.email,
    telephone: this.telephone,
    etat: this.etat,
    createdAt: new Date(),
    createdBy: parseInt(userId, 10), // Utiliser l'ID de l'utilisateur connecté
    updatedAt: new Date(),
    updatedBy: parseInt(userId, 10), // Utiliser l'ID de l'utilisateur connecté
    description: this.description
  };

  // Ajouter le nouveau contact
  contacts.push(newContact);

  // Sauvegarder les contacts dans localStorage
  localStorage.setItem('contacts', JSON.stringify(contacts));

  // Réinitialiser le formulaire
  this.nom = '';
  this.prenom = '';
  this.email = '';
  this.telephone = '';
  this.description = '';

  // Rediriger vers la liste des contacts ou afficher un message de succès
  this.router.navigate(['/contacts']);
}
}
