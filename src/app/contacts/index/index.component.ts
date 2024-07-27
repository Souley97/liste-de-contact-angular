import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})

export class IndexComponent implements OnInit {
  currentUser: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
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
}
