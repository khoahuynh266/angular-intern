import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { ResigterComponent } from "./components/resigter/resigter.component";
import { HomeComponent } from "./components/home/home.component";
import { AccountComponent } from "./components/account/account.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProfileComponent } from "./components/profile/profile.component";
import { UserModalComponent } from "./components/user/user-modal/user-modal.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { AddUserComponent } from "./components/user/add-user/add-user.component";
import { UpdateUserComponent } from "./components/user/update-user/update-user.component";
import { UserComponent } from "./components/user/list-user/user.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { NgModule } from "@angular/core";
import { EncrDecrService } from "./service/encr-decr-service.service";
import { JwtInterceptor } from "./service/jwt-interceptor";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AdminUpdatePasswordComponent } from './components/user/admin-update-password/admin-update-password.component';
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
    ChangePasswordComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AdminUpdatePasswordComponent,
  ],
  imports: [
    NgbModule,
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
    NgxPaginationModule,
  ],

  providers: [AuthGuard, EncrDecrService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
