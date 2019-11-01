import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "./services/auth.service";
import {RequiresAuthenticationGuard} from "./guards/requires-authentication.guard";
import {OAuthModule} from "angular-oauth2-oidc";
import {AuthenticationRequiredComponent} from './components/authentication-required/authentication-required.component';
import {AuthRoutingModule} from "./auth-routing.module";
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AuthenticationRequiredComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    OAuthModule.forRoot(),
    AuthRoutingModule,
  ],
  providers: [
    AuthService,
    RequiresAuthenticationGuard
  ]
})
export class AuthModule { }
