//Library Imports
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

//Custom Components
import { LogoutComponent } from './logout.component';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { CommonModule } from '@angular/common';
import { authRouting } from './auth.routing';

@NgModule({
  declarations: [
    LogoutComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    authRouting
  ]
})
export class AuthModule {

}
