import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUpData } from 'src/app/model/SignUpData';
import { AuthenticationService } from 'src/app/service/authentication.service';
@Component({
  selector: 'app-resigter',
  templateUrl: './resigter.component.html',
  styleUrls: ['./resigter.component.css']
})
export class ResigterComponent implements OnInit {
  isFormInValid = false;
  isPasswordInvalid = false;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void { }
  onSubmit(signUpForm: NgForm) {
    if (!signUpForm.valid) {
      this.isFormInValid = true;
      this.isPasswordInvalid = false;
      return;
    } else
      if (signUpForm.value.password !== signUpForm.value.confirm_password) {
        this.isFormInValid = false;
        this.isPasswordInvalid = true;
        return;
      }
    this.checkCredentials(signUpForm);
  }
  private checkCredentials(signUpForm: NgForm) {
    // const fullname = signUpForm.value.first_name + ' ' + signUpForm.value.last_name;
    const signUpData = new SignUpData(
      signUpForm.value.username,
      signUpForm.value.password,
      signUpForm.value.fullname,
      signUpForm.value.phone
    );
    if (!this.authenticationService.resigter(signUpData)) {
      this.isFormInValid = false;
      this.isPasswordInvalid = false;
    }
  }
}
