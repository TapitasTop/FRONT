import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  onSubmit() {
    this.authenticationService
      .login(this.username, this.password)
      .subscribe((result) => {
        if (result === true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid login credentials';
        }
      });
  }
}
