import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password: "";
  nombreUsuario: "";
  loginError = false

  constructor(private httpService: AppService, private router: Router, private userService: AppService, private cookieService: CookieService) {}
  ngOnInit(): void {}

  login() {
    const user = { nombreUsuario: this.nombreUsuario, password: this.password };
    this.loginError = false
    this.userService.login(user).subscribe(
      (data) => {
        this.cookieService.set('Cookie', data.token);
        this.router.navigateByUrl('/home');
      },
      (error: any) => {
        this.loginError = true
        console.log(error);
      }
    );
  }

  register() {
    this.router.navigateByUrl('/registro');
  }

  forgotPassword() {
    this.router.navigateByUrl('/forgotPassword');
  }
}
