import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/service/authentication.service";
import { UserModalComponent } from "../user/user-modal/user-modal.component";
import * as CryptoJS from "crypto-js";
import { EncrDecrService } from "src/app/service/encr-decr-service.service";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;
  oldPassword: string;
  conversionEncryptOutput: any;
  constructor(
    fb: FormBuilder,
    private authenticateService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private EncrDecr: EncrDecrService
  ) {
    this.changePasswordForm = fb.group(
      {
        oldPassword: [null,  [Validators.minLength(3)]],
        newPassword: [null, [Validators.required,Validators.minLength(3)]],
        confirmPassword: [null, [ Validators.required,Validators.minLength(3)]],
      },
      {
        validators: [
          this.MustMatch("newPassword", "confirmPassword"),
          this.MustNotMatch("oldPassword", "newPassword"),
        ],
      }
    );
  }
  id;
  changePassword() {
    console.log("id "+this.id)
    this.conversionEncryptOutput = this.EncrDecr.set(
      this.changePasswordForm.value.oldPassword.trim()
    );

    this.submitted = true;
    // const id = parseInt(localStorage.getItem('currentId'));
    const body = {
      oldPassword: this.EncrDecr.set(
        this.changePasswordForm.value.oldPassword.trim()
      ),
      newPassword: this.EncrDecr.set(
        this.changePasswordForm.value.newPassword.trim()
      ),
    };
    console.log(body.newPassword);
    if (this.changePasswordForm.valid) {
      this.authenticateService.changePassword(body, this.id).subscribe(
        (data) => {
          this.openModal(
            "Success",
            "Password changed successfully!",
            "alert-success"
          );
          this.router.navigate(["profile"]);
        },
        (error) => {
          this.openModal("Fail", error.error.message, "alert-danger");

        }
      );
    }
  }
  get f() {
    return this.changePasswordForm.controls;
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  MustNotMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustNotMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors(null);
      } else {
        matchingControl.setErrors({ mustNotMatch: true });
      }
    };
  }
  onReset() {
    this.submitted = false;
    this.changePasswordForm.reset();
  }
  openModal(title, mess, type) {
    const modalRef = this.modalService.open(UserModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
   this.onReset();
  }

  ngOnInit() {
        this.id = this.authenticateService.currentUserValue.id;
  }
}
