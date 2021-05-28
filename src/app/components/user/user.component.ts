import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SignUpData } from 'src/app/model/SignUpData';
import { UserService } from 'src/app/service/user.service';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  arrAccounts: any = []
  constructor(private http: HttpClient, private userService: UserService,
    private modalService: NgbModal) {
    // userService.getUser().subscribe(data => {
    //   console.log(data);
    //   this.arrAccounts = data;

    // })
  }

  delete(id: String) {
    this.userService.deleteUser(id);
    //  this.getdata().subscribe(data=> {
    const deletedID = this.arrAccounts.find(x => x.id === id);
    this.arrAccounts.splice(this.arrAccounts.indexOf(deletedID), 1)
  }

  getdata() {
    return this.arrAccounts;
  }
  ngOnInit() {
    this.loadAllUsers();
  }
  closeResult = '';

  private loadAllUsers() {
    this.userService.getUser().subscribe(data => {
      console.log(data);
      this.arrAccounts = data;

    })
  }
  open(id) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.title = 'I your title';
    modalRef.componentInstance.user = this.arrAccounts.find(x => x.id === id);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

