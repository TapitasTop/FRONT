import { Component } from "@angular/core";
import { UsersService } from "../users/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  password: string;
  nombreUsuario: string;

  constructor(public userService: UsersService, public router: Router) {}

  login() {
    const user = { nombreUsuario: this.nombreUsuario, password: this.password };
    this.userService.login(user).subscribe(data => { const token = data.token; 
        this.userService.setToken(token);
        console.log(token);
        console.log(this.userService.getToken())
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
