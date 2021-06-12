import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}
  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ["", Validators.required],
      password: ["", Validators.required],
      fullname: ["", Validators.required],
      phone: ["", Validators.required],
      // salary: ['']
    });
  }
  close() {}
  onSubmit() {
    this.userService.addUser(this.addForm.value).subscribe((data) => {
      this.router.navigate(["user"]);
    });
  }
}
