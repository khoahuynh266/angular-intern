import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/service/authentication.service";
import { EncrDecrService } from "src/app/service/encr-decr-service.service";
import { UserModalComponent } from "../user/user-modal/user-modal.component";
@Component({
  selector: "app-resigter",
  templateUrl: "./resigter.component.html",
  styleUrls: ["./resigter.component.css"],
})
export class ResigterComponent implements OnInit {
  isFormInValid = false;
  isPasswordInvalid = false;
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private EncrDecr: EncrDecrService
  ) {}

  signUpForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.signUpForm = this.formBuilder.group(
      {
        fullname: ["", Validators.required],
        username: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(3)]],
        confirmPassword: ["", Validators.required],
        phone: ["",Validators.minLength(9)],
        acceptTerms: [false, Validators.requiredTrue],
      },{
      validators : this.MustMatch("password", "confirmPassword")}
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
  onSubmit(signUpForm: NgForm) {
    this.submitted = true;
    // stop here if form is invalid
    
    if (this.signUpForm.invalid) {
        return;
    }
   this.signUpForm.value.password = this.EncrDecr.set(this.signUpForm.value.password);console.log(this.signUpForm.value);
    this.authenticationService.resigter(this.signUpForm.value)
    .subscribe(
      (data) => {
        this.openModal("Success", "Resigter user successfully!", "alert-success");
      },
      (er) => {
        this.openModal("Fail", er.error.message, "alert-danger");
      }
    );
  }
  get f() {
    return this.signUpForm.controls;
  }
  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }
  openModal(title, mess, type) {
    const modalRef = this.modalService.open(UserModalComponent,{centered:true});
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
    this.router.navigate(["user"]);
  }
}
