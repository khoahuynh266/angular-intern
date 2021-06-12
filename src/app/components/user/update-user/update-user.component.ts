import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/model/user";
import { UserService } from "src/app/service/user.service";

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
    private activatedRoute: ActivatedRoute
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

    this.userService.getCurrentUser(this.id).subscribe(
      (data) => {
        this.user = data;
        this.updateForm.patchValue(this.user);
      },
      (error) => console.log(error)
    );

    console.log(this.id);
  }
  close() {
    this.router.navigate(["user"]);
  }

  onSubmit() {
    console.log(this.user)
    this.userService.updateUser(this.updateForm.value, this.id)
      .subscribe((data) => {
        this.router.navigate(["user"]);
      });
  }
}
