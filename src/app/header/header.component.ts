import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/services/auth.service";

/**
 *
 * This is the header component.
 * @author Ted Sanjeevi, Bree Hall
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /**
   * @ignore
   */
  constructor(
    private authService: AuthService
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  isSignedIn(): boolean {
    return this.authService.hasValidAccessToken() && this.authService.hasValidIdToken();
  }

  signOut() {
    this.authService.signOut();
  }
}
