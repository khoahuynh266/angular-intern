
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/service/authentication.service";
import * as CryptoJS from "crypto-js";
import { EncrDecrService } from "src/app/service/encr-decr-service.service";
import { UserModalComponent } from "../user-modal/user-modal.component";
@Component({
  selector: 'app-admin-update-password',
  templateUrl: './admin-update-password.component.html',
  styleUrls: ['./admin-update-password.component.css']
})
export class AdminUpdatePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  submitted = false;
  oldPassword: string;
  conversionEncryptOutput: any;
  isAdmin = false;
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
        newPassword: [null, [Validators.required,Validators.minLength(3)]],
        confirmPassword: [null, [ Validators.required,Validators.minLength(3)]],
      },
      {
        validators: [
          this.MustMatch("newPassword", "confirmPassword"),
        ],
      }
    );
  }
  id;
  changePassword() {
    console.log("id "+this.id)
    this.submitted = true;
    const body = {
      newPassword: this.EncrDecr.set(
        this.changePasswordForm.value.newPassword.trim()
      ),
    };
    console.log(body.newPassword);
    if (this.changePasswordForm.valid) {
      this.authenticateService.adminChangePassword(body, this.id).subscribe(
        (data) => {
          this.openModal(
            "Success",
            "Password changed successfully!",
            "alert-success"
          );
        },
        (error) => {
          this.openModal("Fail", error.error.message, "alert-danger");
        }
      );
    }}
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
    this.router.navigate(["profile"]);
  }

  ngOnInit() {
      this.id = this.activatedRoute.snapshot.params["id"];
    }
}
