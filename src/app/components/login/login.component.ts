import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInData } from 'src/app/model/sigInData';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isFormInValid = false; // khong hien form invalid
  areCredentialsInvalid = false; // khong hien sai password
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit(singInForm: NgForm) {
    if (!singInForm.valid) {
      this.isFormInValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(singInForm);
  }
  private checkCredentials(singInForm: NgForm) {
    const signInData = new SignInData(
      singInForm.value.email,
      singInForm.value.password
    );
    this.authenticationService.login(signInData).subscribe(
      (data) => {
        console.log(data);
        if (data != null) {
          this.areCredentialsInvalid = false;
          console.log('log true');
          this.router.navigate(['home']);
          return;
        } else {
          this.areCredentialsInvalid = true;
          console.log('log false');
          return;
        }
      },
      (error) => {
        this.areCredentialsInvalid = true;
        console.log('log false');
      }
    );
    this.isFormInValid = false;
  }
}
