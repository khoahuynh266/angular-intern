import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent implements OnInit {
  @Input() title;
  @Input() message;
  @Input() isConfirm;
  @Output() eventUpdate = new EventEmitter<User>();

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {}
  ngOnInit() {}
  public decline() {
    this.activeModal.close(false);
  }
  public accept() {
    this.activeModal.close(true);
  }
  public dismiss() {
    this.activeModal.dismiss();
  }
  close(event) {
    this.activeModal.close(event);
    this.router.navigate(['user']);
  }
}
