import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { UserModalComponent } from '../user/user-modal/user-modal.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;
  constructor(
    fb: FormBuilder,
    private authenticateService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.changePasswordForm = fb.group(
      {
        oldPassword: [null, Validators.required],
        newPassword: [null, Validators.required],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: [
          this.MustMatch('newPassword', 'confirmPassword'),
          this.MustNotMatch('oldPassword', 'newPassword'),
        ],
      }
    );
  }

  changePassword() {
    this.submitted = true;
    const id = parseInt(localStorage.getItem('currentId'));
    if (this.changePasswordForm.valid) {
      this.authenticateService
        .changePassword(this.changePasswordForm.value, id)
        .subscribe(
          (data) => {
            this.openModal(
              'Success',
              'Password changed successfully!',
              'alert-success'
            );
          },
          (error) => {
            this.openModal('Fail', error.error.message, 'alert-danger');
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
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
    this.router.navigate(['profile']);
  }

  ngOnInit() {}
}
