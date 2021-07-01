import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/service/authentication.service";
import { EncrDecrService } from "src/app/service/encr-decr-service.service";
import { UserModalComponent } from "../user/user-modal/user-modal.component";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  verifyErrorMessage: string;
  IsResetFormValid = true;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private EncrDecr: EncrDecrService,
    private modalService: NgbModal,
  ) {
    this.CurrentState = "Wait";
    this.route.queryParams.subscribe((params) => {
      this.resetToken = params["token"];
      console.log(this.resetToken);
      this.VerifyToken();
    });
  }

  ngOnInit() {
    this.Init();
  }

  VerifyToken() {
    this.authService.ValidPasswordToken(this.resetToken).subscribe(
      (data) => {
        this.CurrentState = "Verified";
      },
      (err) => {
        // this.CurrentState = "NotVerified";
        // this.verifyErrorMessage= err.error.message;
        this.openModal('Fail', err.error.message + " please get new token!", 'alert-danger');
        this.router.navigate(["forgotPassword"]);     }
    );
    console.log(this.CurrentState);
  }

  Init() {
    this.ResponseResetForm = this.fb.group({
      token: [this.resetToken],
      newPassword: ["", [Validators.required, Validators.minLength(3)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(3)]],
    },{
      validators: [
        this.MustMatch('newPassword', 'confirmPassword')]});
  }
  close() {
    this.router.navigate(["login"]);
  }
  get f() {
    return this.ResponseResetForm.controls;
  }
  ResetPassword(form) {
    this.ResponseResetForm.value.newPassword = this.EncrDecr.set(this.ResponseResetForm.value.newPassword);
    // this.ResponseResetForm.value.confirmPassword = this.EncrDecr.set(this.ResponseResetForm.value.confirmPassword);
      this.authService.newPassword(this.ResponseResetForm.value).subscribe(
        (data) => {
          this.ResponseResetForm.reset();
          this.successMessage = data.message;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(["login"]);
          }, 3000);
        },
        (err) => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
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
  openModal(title, mess, type) {
    const modalRef = this.modalService.open(UserModalComponent,{centered:true});
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
    this.router.navigate(["user"]);
  }
}
