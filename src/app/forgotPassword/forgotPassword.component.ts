import { Component } from "@angular/core";
import { UsersService } from "../users/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgetPassword",
  templateUrl: "./forgotPassword.component.html",
  styleUrls: ["./forgotPassword.component.css"]
})
export class ForgotPasswordComponent {
  email: string;
  password: string;

  constructor(public userService: UsersService, public router: Router) {}
  
  send() {
    this.router.navigateByUrl("/login");
  }
  
}