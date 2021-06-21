import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/model/user";
import { UserService } from "src/app/service/user.service";
import { UserModalComponent } from "../user/user-modal/user-modal.component";
interface Item {
  text: string;
  value: number;
}
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  listdeparment = [];
  selectedItem;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {}

  currentUser;
  profileForm: FormGroup;
  roles: FormGroup;

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      id: [],
      username: [{ value: "", disabled: true }, Validators.required],
      fullname: ["", Validators.required],
      phone: ["", Validators.required],
      birthday: "",
      sex: "",
      avatar: "",
      rolename: { value: "", disabled: true },
      departmentname: "",
      address: "",
    });

    // Load the current user's data
    const id = parseInt(localStorage.getItem("currentId"));
    this.userService.getProfile(id).subscribe((userData) => {
      console.log(userData);
      this.currentUser = userData;
      this.currentUser.rolename = userData.roles[0].name;
      this.profileForm.patchValue(this.currentUser);
      console.log(this.currentUser.roles[0].name);
    });
  }
  onSubmit() {
    console.log(this.currentUser.id);
    this.userService
      .updateUser(this.profileForm.value, this.currentUser.id)
      .subscribe(
        (data) => {
          this.openModal(
            "Success",
            "Update user successfully!",
            "alert-success"
          );
        },
        (error) => {
          this.openModal("Fail", "User update is failed!", "alert-danger");
        }
      );
  }

  openModal(title, mess, type) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
    this.router.navigate(["user"]);
  }
}
