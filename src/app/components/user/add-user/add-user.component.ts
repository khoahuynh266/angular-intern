import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal
  ) {}
  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      fullname: ['', Validators.required],
      phone: ['', Validators.required],
      // salary: ['']
    });
  }
  close() {
    this.router.navigate(['user']);
  }
  onSubmit() {
    this.userService.addUser(this.addForm.value).subscribe(
      (data) => {
        this.openModal('Success', 'Add user successfully', 'alert-success');
        this.router.navigate(['user']);
      },
      (e) => {
        console.log(e.error);
        this.openModal('Fail', e.error.message, 'alert-danger');
      }
    );
  } 
  openModal(title, mess, type) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.title = [title, type];
    modalRef.componentInstance.message = mess;
    modalRef.componentInstance.isConfirm = false;
  }
}
