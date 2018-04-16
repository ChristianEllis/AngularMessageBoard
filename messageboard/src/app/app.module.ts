//Library Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { ReactiveFormsModule } from '@angular/forms';

//Custom Modules
import { MessageModule } from './messages/message.module';
import { AuthModule } from './auth/auth.module';

//Custom Services
import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';

//Custom Components
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { HeaderComponent } from './header.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { ErrorComponent } from './errors/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    ROUTING,
    AuthModule,
    MessageModule
  ],
  providers: [
    AuthService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
