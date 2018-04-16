//Library Imports
import { Routes, RouterModule } from '@angular/router';

//Custom Components
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';

// *Setup General App Routes
const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' } //Lazy loading
]

export const ROUTING = RouterModule.forRoot(APP_ROUTES); //Register routes
