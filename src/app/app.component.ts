import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { AuthenticationService } from "./service/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angular-demo";


  constructor(
    public authenticationService: AuthenticationService,
    // private router: Router
    ) { }

    logout() {
    this.authenticationService.logout();
  }
}
