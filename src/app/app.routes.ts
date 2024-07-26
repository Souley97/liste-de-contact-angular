import { Routes } from '@angular/router';
import { IndexComponent } from './contacts/index/index.component';
import { LoginComponent } from './users/login/login.component';
import { CreateComponent } from './contacts/create/create.component';
import { CorbeilleComponent } from './contacts/corbeille/corbeille.component';
import { DetailComponent } from './contacts/detail/detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { "path": "", component: IndexComponent },
    { "path": "login", component:LoginComponent},
    { "path": "create", component:CreateComponent},
    { "path": "corbeille", component:CorbeilleComponent},
    { "path": "details", component:DetailComponent},
    { "path": "**", component:PageNotFoundComponent},


    
];
