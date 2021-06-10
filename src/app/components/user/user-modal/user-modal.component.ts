import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { SignUpData } from "src/app/model/SignUpData";
import { User } from "src/app/model/user";

import { UserService } from "src/app/service/user.service";
import { UserComponent } from "../user.component";
@Component({
  selector: "app-user-modal",
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.css"],
})
export class UserModalComponent implements OnInit {
  @Input() title;
  @Input() user;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {}
  private userComponent: UserComponent;
  ngOnInit() {}

  onSubmit(updateForm: NgForm) {
    var username, fullname, phone;
    if (updateForm.value.username === "") {
      username = this.user.username;
    } else username = updateForm.value.username;
    if (updateForm.value.fullname === "") {
      fullname = this.user.fullname;
    } else fullname = updateForm.value.fullname;
    const data = new SignUpData(
      username,
      "",
      fullname,
      //  signUpForm.value.role
      updateForm.value.phone
    );

    this.userService.updateUser(data, this.user.id);
    this.activeModal.close(data);
    // call refreshdata ở UserComponent
  }
}
