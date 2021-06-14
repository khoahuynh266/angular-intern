import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/service/user.service";
import { ModalConfirmComponent } from "../modal-confirm/modal-confirm.component";
import { UserModalComponent } from "../user-modal/user-modal.component";

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
    private router: Router,
    private modalService: NgbModal
  ) {}

  delete(id: number) {
    let confirm;
    const deletedID = this.arrAccounts.find((x) => x.id === id);

    const modalRef = this.modalService.open(ModalConfirmComponent);
    // modalRef.componentInstance.title = ["Delete User ID :" + deletedID.id,"alter-danger"];
    // modalRef.componentInstance.id = id;
    modalRef.componentInstance.mesage = "Are you sure to delete " + this.arrAccounts[deletedID.username];
    // modalRef.componentInstance.isConfirm = true;
    modalRef.result
      .then((confirmed) => {
        if (confirmed === true) {
          confirm = confirmed;
          console.log("User confirmed:", confirmed);
          this.userService.deleteUser(id);
            this.arrAccounts.splice(this.arrAccounts.indexOf(deletedID), 1);
           
        }
      })
      .catch(() => {});


  }

  public onClose() {
    this.refreshData();
  }
  ngOnInit() {
    this.refreshData();
  }

  public refreshData() {
    this.userService.getUser().subscribe((data) => {
      console.log(data);
      this.arrAccounts = data;
    });
  }

  updateUser(id) {
    this.router.navigate(["user/update/" + id]);
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
