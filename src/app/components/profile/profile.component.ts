import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  profile: User;
  currentUser: User;
  isUser: boolean;

  ngOnInit() {
    this.route.data.subscribe(
      (data: { profile: User }) => {
        this.profile = data.profile;
      }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.isUser = (this.currentUser.username === this.profile.username);
      }
    );
  }


}
