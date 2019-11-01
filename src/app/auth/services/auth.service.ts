import {Injectable} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  private readonly discoveryUrl: string = 'https://accounts.google.com/.well-known/openid-configuration';

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.oauthService.configure(this.initAuthConfig());
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocument(this.discoveryUrl).then( async () => {
      const successfulLogin: boolean = await this.oauthService.tryLogin();
      if (successfulLogin) {
        this.router.navigate(['/home']);
      }
    })
  }

  attemptSignIn() {
    this.oauthService.loadDiscoveryDocument(this.discoveryUrl).then( async () => {
      await this.oauthService.initCodeFlow();
    });
  }

  hasValidIdToken(): boolean {
    return this.oauthService.hasValidIdToken();
  }

  hasValidAccessToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  signOut() {
    this.oauthService.logOut();
  }


  /*
   * https://console.developers.google.com/ to create a set of test credentials quickly
   */
  private initAuthConfig(): AuthConfig {
    return {
      responseType: "code",
      strictDiscoveryDocumentValidation: false,
      oidc: true,
      scope: environment.oauth.scope,
      issuer: environment.oauth.issuer,
      requestAccessToken: true,
      clearHashAfterLogin: true,
      disablePKCE: false,
      redirectUri: environment.oauth.redirectUri,
      clientId: environment.oauth.clientId,
      logoutUrl: environment.oauth.logoutUrl,
      showDebugInformation: true,
      dummyClientSecret: environment.oauth.clientSecret
    }
  }
}
