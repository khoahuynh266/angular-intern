import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { SignUpData } from "src/app/model/SignUpData";
import { User } from "src/app/model/user";

import { UserService } from "src/app/service/user.service";
@Component({
  selector: "app-user-modal",
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.css"],
})
export class UserModalComponent implements OnInit  {
  @Input() title;
  @Input() user;
  @Output() eventUpdate = new EventEmitter<User>();

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {}
  ngOnInit() {}

  onSubmit(updateForm: NgForm) {
    let username, fullname, phone;
    if (updateForm.value.username === "") {
      username = this.user.username;
    } else {
      username = updateForm.value.username;
    }
    if (updateForm.value.fullname === "") {
      fullname = this.user.fullname;
    } else {
      fullname = updateForm.value.fullname;
    }
    if (updateForm.value.phone === "") {
      phone = this.user.phone;
    } else {
      phone = updateForm.value.phone;
    }

    const data = new SignUpData(
      username,
      "",
      fullname,
      //  signUpForm.value.role
      updateForm.value.phone
    );
    this.userService.updateUser(data, this.user.id);
    this.activeModal.close(data);
    this.user=data;
    // call refreshdata ở UserComponent
    this.eventUpdate.emit(this.user);  
  }  
  
}
