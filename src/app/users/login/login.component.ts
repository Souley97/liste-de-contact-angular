import { Component } from '@angular/core';
import { Router ,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor(private router: Router) {}

  login(): void {
    if (this.email === '' || this.password === '') {
      this.errorMessage = 'Veuillez entrer le nom d\'utilisateur et le mot de passe.';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      // Stocker les informations de l'utilisateur dans localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/contacts']);
    } else {
      this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
    }
  }
}
