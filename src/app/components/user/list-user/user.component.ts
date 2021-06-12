import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  arrAccounts: any = [];
  username: any;
  key = "stt";
  reverse = false;
  p = 1;
  id: number;
  constructor(
    // private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  delete(id: number) {
    const deletedID = this.arrAccounts.find((x) => x.id === id);
    if(confirm("Are you sure to delete " + this.arrAccounts[deletedID])) {
      this.userService.deleteUser(id);
      this.arrAccounts.splice(this.arrAccounts.indexOf(deletedID), 1);
      console.log("Implement delete functionality here");
    }
    
  }
  public onClose() {
    this.refreshData();
  }
  ngOnInit() {
    this.refreshData();
  }

  closeResult = "";

  public refreshData() {
    this.userService.getUser().subscribe((data) => {
      console.log(data);
      this.arrAccounts = data;
    });
  }

  updateUser(id) {
    this.router.navigate(["user/update/"+id]);
  }
  
  addUser(): void {
    this.router.navigate(["user/add"]);
  }

  Search() {
    console.log(this.username);
    if (this.username == "") {
      this.ngOnInit();
    } else {
      this.arrAccounts = this.arrAccounts.filter((res) => {
        return res.username
          .toLocaleLowerCase()
          .match(this.username.toLocaleLowerCase());
      });
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}