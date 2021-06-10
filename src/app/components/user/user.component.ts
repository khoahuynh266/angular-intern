import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, Output } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/model/user";
import { UserService } from "src/app/service/user.service";
import { UserModalComponent } from "./user-modal/user-modal.component";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  arrAccounts: any = [];
  username: any;
  key: string = "stt";
  reverse: boolean = false;
  p: number = 1;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  delete(id: number) {
    this.userService.deleteUser(id);
    //  this.getdata().subscribe(data=> {
    const deletedID = this.arrAccounts.find((x) => x.id === id);
    this.arrAccounts.splice(this.arrAccounts.indexOf(deletedID), 1);
  }
  public onClose()
  {
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
  open(id) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.title = "I your title";
    modalRef.componentInstance.user = this.arrAccounts.find((x) => x.id === id);
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

  ////

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
function s(arg0: number, s: any) {
  throw new Error("Function not implemented.");
}
