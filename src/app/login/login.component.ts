import { Component } from "@angular/core";
import { UsersService } from "../users/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(public userService: UsersService, public router: Router) {}

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(
      (      data: { token: String; }) => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl("/home");
      },
      (      error: any) => {
        console.log(error);
      }
    );
  }

  register() {
    this.router.navigateByUrl("/register");
  }

  forgotPassword() {
    this.router.navigateByUrl("/forgotPassword");
  }

}
