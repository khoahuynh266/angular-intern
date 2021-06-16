import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/model/user";
import { UserService } from "src/app/service/user.service";
import { UserModalComponent } from "../user-modal/user-modal.component";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"],
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}
  updateForm: FormGroup;
  id: number;
  user: User;
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];

    this.updateForm = this.formBuilder.group({
      id: [],
      username: ["", Validators.required],
      // password: ["", Validators.required],
      fullname: ["", Validators.required],
      phone: ["", Validators.required],
      role: "",
      // salary: ['']
    });

    this.userService.getUser(this.id).subscribe(
      (data) => {
        this.user = data;
        this.updateForm.patchValue(this.user);
      },
      (error) => console.log(error)
    );
    console.log(this.id);
  }

  openModal(title, mess, type) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
    this.router.navigate(["user"]);
  }

  close() {
    this.router.navigate(["user"]);
  }

  onSubmit() {
    console.log(this.user);
    this.userService.updateUser(this.updateForm.value, this.id).subscribe(
      (data) => {
        this.openModal("Success", "Update user successfully!", "alert-success");
      },
      (error) => {
        this.openModal("Fail", "User update is failed!", "alert-danger");
      }
    );
  }
}
