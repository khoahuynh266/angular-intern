import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/service/authentication.service";
import { UserService } from "src/app/service/user.service";
import { UserModalComponent } from "../user/user-modal/user-modal.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  listDepartment: any = [];
  fileToUpload: File | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  currentUser;
  profileForm: FormGroup;
  model: NgbDateStruct;
  ngOnInit() {
    this.userService.getListDepartment().subscribe((data) => {
      console.log(data);
      this.listDepartment = data;
    });

    this.profileForm = this.formBuilder.group({
      id: [],
      username: [{ value: "", disabled: true }, Validators.required],
      fullname: ["", Validators.required],
      phone: ["", Validators.required],
      birthday: ["",],
      sex: "",
      avatar: "",
      rolename: { value: "", disabled: true },
      iddepartment: "",
      address: "",
    });

    // Load the current user's data
    const id = this.authenticationService.currentUserValue.id
    this.userService.getProfile(id).subscribe((userData) => {
      console.log(userData);
      this.currentUser = userData;
      this.currentUser.rolename = userData.roles[0].name;
      this.profileForm.patchValue(this.currentUser);
      console.log(this.currentUser.roles[0].name);
    });
  }

  changeDepartment(e) {
    console.log(e.target.value);
  }
  onDateSelect(e) {
    console.log(e.target.value);
  }
  onSubmit() {
    console.log(this.currentUser.id);
    this.userService
      .updateProfile(this.profileForm.value, this.currentUser.id)
      .subscribe(
        (data) => {
          this.openModal(
            "Success",
            "Update profile successfully!",
            "alert-success"
          );
        },
        (error) => {
          this.openModal("Fail", "User profile is failed!", "alert-danger");
        }
      );
  }

  openModal(title, mess, type) {
    const modalRef = this.modalService.open(UserModalComponent,{centered:true});
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
    this.router.navigate(["user"]);
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
}
