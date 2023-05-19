import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-degustaciones-valoradas',
  templateUrl: './degustaciones-valoradas.component.html',
  styleUrls: ['./degustaciones-valoradas.component.css']
})
export class DegustacionesValoradasComponent implements OnInit {
  degustaciones: any[];
  error: any;
  loading: boolean = true;

  constructor(private httpService: AppService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.getDegustacionesOrdenadas();
  }

  getDegustacionesOrdenadas(): void {
    const token = { token: this.cookieService.get('Cookie')};
    this.httpService.getDegustacionesOrdenadas()
      .subscribe(
        (data) => {
          this.degustaciones = data;
          this.loading = false;
        },
        (error) => {
          const sessionCookie = this.cookieService.get('Cookie');
          if (!sessionCookie) {
            this.router.navigate(["/login"]);
          }
          console.log(error);
          this.error = error;
          this.loading = false;
        }
      );
  }

}
