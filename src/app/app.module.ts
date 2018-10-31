import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BatchModule } from '../app/Team2/batch/batch.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    BatchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
