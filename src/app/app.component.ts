import { Component } from '@angular/core';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ContactComponent]
})
export class AppComponent {
  title = 'liste-de-contact-angular';
}
