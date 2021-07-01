import { Component } from "@angular/core";
import { AuthenticationService } from "./service/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angular-demo";

  constructor(
    public authenticationService: AuthenticationService // private router: Router
  ) {
    // const curUser = localStorage.getItem("currentUser");
    // if (curUser) {
    //   const accessToken = localStorage.getItem("accessToken");
    //   authenticationService.isAuthenticated = true;
    // } else {
    //   authenticationService.isAuthenticated = false;
    // }
    // console.log(authenticationService.currentUserValue)
  }

  logout() {
    this.authenticationService.logout();
  }
}
