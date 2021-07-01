import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;
submit = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
   ) {

  }
  close() {
    this.router.navigate(["login"]);
  }
  ngOnInit() {
    this.submit = false;
    this.RequestResetForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onclick(){
    this.errorMessage = null;
    this.successMessage = null;
  }
  onSubmit() {
    if (this.RequestResetForm.valid) {
      this.IsvalidForm = true;
      this.submit = true;
      this.authService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.errorMessage = null;
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = null;
            // window.location.href="https://mail.google.com/mail/";
            this.router.navigate(["login"]);
          }, 3000);
        },
        err => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}