import { Routes } from '@angular/router';
import { IndexComponent } from './contacts/index/index.component';
import { LoginComponent } from './users/login/login.component';
import { CreateComponent } from './contacts/create/create.component';
import { CorbeilleComponent } from './contacts/corbeille/corbeille.component';
import { DetailComponent } from './contacts/detail/detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './users/register/register.component';

export const routes: Routes = [
    { "path": "", component: IndexComponent },
    { "path": "contacts", component: IndexComponent },
    { "path": "login", component:LoginComponent},
    { "path": "register", component:RegisterComponent},
    { "path": "create", component:CreateComponent},
    { "path": "corbeille", component:CorbeilleComponent},
    { "path": "detail/:id", component:DetailComponent},
    { "path": "**", component:PageNotFoundComponent},


    
];
