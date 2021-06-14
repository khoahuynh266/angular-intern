import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/model/user";
@Component({
  selector: "app-user-modal",
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.css"],
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
    private router: Router,
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

  
  // open(content) {
  //   this.modalService
  //     .open(content, { ariaLabelledBy: "modal-basic-title" })
  //     .result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       }
  //     );
  // }
  
  close(event) {
    this.activeModal.close(event);
    this.router.navigate(["user"]);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  public confirm(
    title: string,
    message: string,
    dialogSize: "sm" | "lg" = "sm"
  ): Promise<boolean> {
    const modalRef = this.modalService.open(UserModalComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;

    return modalRef.result;
  }
}


