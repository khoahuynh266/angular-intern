import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
   providers: [AuthenticationService]
})
export class AccountComponent implements OnInit {
  arrAccounts:any= []
  constructor( private accountService : AuthenticationService) {
    // accountService.getAccount().subscribe(data=> {
    //   console.log(data);
    //   this.arrAccounts = data;
    // })
   }
  ngOnInit() {
  }

}
