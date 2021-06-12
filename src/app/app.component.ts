import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-demo';


  constructor(
    public authenticationService: AuthenticationService,
    // private router: Router
    ) {
      const user = localStorage.getItem('user');
     }

    logout() {
    this.authenticationService.logout();

  }
}
