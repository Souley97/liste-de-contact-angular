import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj: User = {
    email: "",
    password: "",
  };

  signupUsers: User[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData) {
      this.signupUsers = JSON.parse(localData) as User[];
    }
  }

  onLogin(): void {
    const isUserExist = this.signupUsers.find(user => user.email === this.loginObj.email && user.password === this.loginObj.password);
    if (isUserExist) {
      alert('Connexion réussie');
      localStorage.setItem('currentUser', JSON.stringify(isUserExist));
      this.router.navigate(['/contact']); // Redirige vers la page d'accueil ou tableau de bord
    } else {
      alert('Mauvais identifiants');
    }
  }
}
