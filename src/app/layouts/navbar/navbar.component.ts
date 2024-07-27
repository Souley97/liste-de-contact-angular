import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../../users/login/login.component';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule , LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  currentUser: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté depuis localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser= JSON.parse(user);
    } else {
      // Rediriger vers la page de login si non connecté
      this.router.navigate(['/login']);
    }
  }
}
