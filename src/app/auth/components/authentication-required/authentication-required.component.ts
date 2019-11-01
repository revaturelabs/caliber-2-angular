import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-authentication-required',
  templateUrl: './authentication-required.component.html',
  styleUrls: ['./authentication-required.component.css']
})
export class AuthenticationRequiredComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  attemptSignIn(): void {
    this.authService.attemptSignIn();
  }

}
