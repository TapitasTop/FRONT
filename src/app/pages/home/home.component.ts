import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private httpService: AppService
  ) {}

  ngOnInit(): void {
    const token = { token: this.cookieService.get('Cookie')};
    this.httpService.getUsuario(token).subscribe(
      (user) => {
        console.log("guay");
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
