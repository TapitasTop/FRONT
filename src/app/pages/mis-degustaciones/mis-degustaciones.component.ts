import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-degustaciones',
  templateUrl: './mis-degustaciones.component.html',
  styleUrls: ['./mis-degustaciones.component.css']
})
export class MisDegustacionesComponent implements OnInit {
  degustaciones: any[];
  error: any;
  loading: boolean = true;
  constructor(private httpService: AppService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.postDegustacionesUsuario();
  }

  postDegustacionesUsuario(): void {
    const sessionCookie = this.cookieService.get('Cookie');
    console.log(sessionCookie)
    this.httpService.postDegustacionesUsuario(sessionCookie)
      .subscribe(
        (data) => {
          this.degustaciones = data;
          this.loading = false;
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
