import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password: "";
  nombreUsuario: "";

  constructor(private httpService: AppService, private router: Router, private userService: AppService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    const user = { nombreUsuario: this.nombreUsuario, password: this.password };
    this.userService.login(user).subscribe(
      (data) => {
        this.router.navigateByUrl('/home');
      },
      (error: any) => {
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
