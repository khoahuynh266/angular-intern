import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SignInData } from "src/app/model/sigInData";
import { AuthenticationService } from "src/app/service/authentication.service";
import { EncrDecrService } from "src/app/service/encr-decr-service.service";
import { UserModalComponent } from "../user/user-modal/user-modal.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isFormInValid = false; // khong hien form invalid
  areCredentialsInvalid = false; // khong hien sai password
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private EncrDecr: EncrDecrService
  ) {}
  isRemember;
  ngOnInit(): void {}
  onSubmit(singInForm: NgForm) {
    if (!singInForm.valid) {
      this.isFormInValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(singInForm);
  }
  changeRemember(e)
  {}
  openModal(title, mess, type) {
    const modalRef = this.modalService.open(UserModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
    this.router.navigate(["profile"]);
  }
  private checkCredentials(singInForm: NgForm) {
    const signInData = new SignInData(
      singInForm.value.email,
      this.EncrDecr.set(singInForm.value.password),
      this.isRemember
    );
    this.authenticationService.login(signInData,this.isRemember).subscribe(
      (data) => {
        if (data != null) {
          this.areCredentialsInvalid = false;
          console.log("log true");
          this.router.navigate(["home"]);
          return;
        } else {
          this.areCredentialsInvalid = true;
          console.log("log false");
          return;
        }
      },
      (err) => {
        if (err.error.message === "") {
          this.areCredentialsInvalid = true;
        } else {
          this.openModal("Fail", err.error.message, "alert-danger");
        }
      }
    );

    this.isFormInValid = false;
  }
}
