import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Contact
{
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: number;
  updatedBy: number | null;
  etat: 'actif' | 'inactif';

}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ContactsModule { }
