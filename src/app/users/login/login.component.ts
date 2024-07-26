import { Component } from '@angular/core';
// user.model.ts
export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
