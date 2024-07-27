// register.component.ts
import { Component , OnInit} from '@angular/core';
import { Router , RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm , FormsModule} from '@angular/forms';


// interface User
interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];

    if (users.some(user => user.email === this.email)) {
      this.errorMessage = 'Cet email est déjà utilisé.';
      return;
    }
   
    const newUser: User = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/login']);
  }
}
