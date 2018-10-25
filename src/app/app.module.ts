import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserModule } from './User/user/user.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
