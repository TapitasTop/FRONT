import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nombre = ""
  nombreUsuario = ""
  foto = ""

  constructor(
    private cookieService: CookieService,
    private httpService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = { token: this.cookieService.get('Cookie')};
    this.httpService.getUsuario(token).subscribe(
      (user) => {
        this.nombre = user.nombre, this.nombreUsuario = user.nombreUsuario, this.foto = user.foto
      },
      (error: any) => {
        const sessionCookie = this.cookieService.get('Cookie');
        if (!sessionCookie) {
          this.router.navigateByUrl("/login");
        }
        console.log(error);
      }
    );
  }

  /*
  pagina() {
    this.cookieService.delete('Cookie')
    this.router.navigateByUrl("/login");
  }
  */
}
