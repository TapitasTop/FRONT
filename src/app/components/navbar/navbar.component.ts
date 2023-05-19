import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { DegustSearchMethod } from 'src/app/degust-search-method';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchInput = ""
  degustaciones: {
    nombre: string,
    origen: string,
    descripcion: string,
    foto: string,
    media: number,
    tipoComida: string,
    fechaAlta: string,
    calificadorGusto: string
    }[] = []
  metodo = DegustSearchMethod.nombre

constructor(private cookieService: CookieService,
  private httpService: AppService,
  public router: Router) { }

  ngOnInit(): void {
    this.httpService.getDegustaciones().subscribe(
      (response) => {
        this.degustaciones = response
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  pagina() {
    this.cookieService.delete('Cookie')
    this.router.navigateByUrl("/login");
  }

}
