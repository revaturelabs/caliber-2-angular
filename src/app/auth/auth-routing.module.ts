import {RouterModule, Routes} from "@angular/router";
import {AuthenticationRequiredComponent} from "./components/authentication-required/authentication-required.component";
import {NgModule} from "@angular/core";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";

const routes: Routes = [
  {
    path: 'sign-in',
    component: AuthenticationRequiredComponent
  },
  {
    path: 'not-allowed',
    component: UnauthorizedComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
