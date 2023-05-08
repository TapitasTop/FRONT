import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: "";

  constructor(private httpService: AppService, private router: Router, private userService: AppService, private cookieService: CookieService) {}

  ngOnInit(): void {}

  submit() {
    const email = { email: this.email };
    this.userService.forgotPassword(email).subscribe(
      (data) => {
        this.router.navigateByUrl('/login');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}


 