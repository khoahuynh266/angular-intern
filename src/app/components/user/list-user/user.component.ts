import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  arrAccounts: any = [];
  username: any;
  key = 'stt';
  reverse = false;
  p = 1;
  id: number;
  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  deleteUser(id, username) {
    const deletedID = this.arrAccounts.find((x) => x.id === id);

    const modalRef = this.modalService.open(UserModalComponent,{centered:true});
    modalRef.componentInstance.title = ['Delete User id :' + deletedID.id];
    modalRef.componentInstance.message = 'Are you sure to delete ' + username;
    modalRef.componentInstance.isConfirm = true;
    modalRef.result
      .then((confirmed) => {
        if (confirmed === true) {
          console.log(deletedID);
          this.userService.deleteUser(id).subscribe((data) => {
            this.arrAccounts.splice(this.arrAccounts.indexOf(deletedID), 1);
            this.openModal(
              'Success',
              'Delete user successfully!',
              'alert-success'
            );
          },
          (err)=> {this.openModal('Fail', 'Delete user is failed!', 'alert-danger');});
        }
      })
  }

  openModal(title, mess, type) {
    const modalRef = this.modalService.open(UserModalComponent,{centered:true});
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
  }

  changeStatus(event, param) {
    console.log(param.active);
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.title = ['Confirm'];
    modalRef.componentInstance.message =
      'Are you sure change Status User: ' + param.username;
    modalRef.componentInstance.isConfirm = true;
    modalRef.result
      .then(
        (confirmed) => {
          if (confirmed === true) {
            console.log('confirmed:', confirmed);
            this.userService.changeStatus(param.active, param.id).subscribe(
              (data) => {
                this.openModal(
                  'Success',
                  'Change user status successfully!',
                  'alert-success'
                );
                // this.isChangeStatus = true;
                // this.closeAlert();
              },
              (error) => {
                this.openModal(
                  'Fail',
                  'Change user status failed!',
                  'alert-danger'
                );
              }
            );
          } else {
            console.log('confirmed: else  ', confirmed);
            const account = this.arrAccounts.find((x) => x.id === param.id);
            account.active = !account.active;
          }
        },
        (reson) => {}
      )
      .catch(() => {});
  }
  public onClose() {
    this.refreshData();
  }
  ngOnInit() {
    this.refreshData();
  }

  public refreshData() {
    this.userService.getListUser().subscribe((data) => {
      console.log(data);
      this.arrAccounts = data;
    });
  }

  updateUser(id) {
    this.router.navigate(['user/update/' + id]);
  }

  addUser(): void {
    this.router.navigate(['user/add']);
  }

  Search() {
    console.log(this.username);
    if (this.username === '' ) {
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
