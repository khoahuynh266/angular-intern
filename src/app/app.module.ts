import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ResigterComponent } from './components/resigter/resigter.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { UserModalComponent } from './components/user/user-modal/user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResigterComponent,
    HomeComponent,
    AccountComponent,
    UserComponent,
    ProfileComponent,
    UserModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
