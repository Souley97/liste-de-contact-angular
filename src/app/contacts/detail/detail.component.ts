import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Contact } from '../contacts.module';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  contactId: number | null = null;

  @Input() contact?: Contact;

  ngOnInit(): void {
   
  }


  getUserNameById(userId: number): string {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.id === userId);
    return user ? user.nom : 'Utilisateur inconnu';
  }
  closeModal(): void {
    this.contact = undefined;
  }
}
