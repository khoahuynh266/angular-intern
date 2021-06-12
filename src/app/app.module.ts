import { BrowserModule } from '@angular/platform-browser';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { UserModalComponent } from './components/user/user-modal/user-modal.component';
import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { UserComponent } from './components/user/list-user/user.component';
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
    AddUserComponent,
    UpdateUserComponent,
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
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
