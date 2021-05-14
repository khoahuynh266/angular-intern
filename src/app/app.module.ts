import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ResigterComponent } from './components/resigter/resigter.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResigterComponent,
    HomeComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule,s
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
     CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
