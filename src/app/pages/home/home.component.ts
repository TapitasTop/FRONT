import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

interface Degustacion {
  calificadorGusto: string,
  descripcion: string,
  fechaAlta: string,
  foto: string,
  media: 0,
  nombre: string,
  origen: string,
  tipoComida: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nombre = ""
  nombreUsuario = ""
  fotoUsuario = ""
  apellidos = ""
  correo = ""
  fechaNacimiento = ""
  genero = ""
  introduccion = ""
  localizacion = ""
  pais = ""
  password = ""
  fotoDegustacion: string[] = new Array();
  nombreDegustacion: string[] = new Array();
  degustacionG: Degustacion[] = []

  constructor(
    private cookieService: CookieService,
    private httpService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = { token: this.cookieService.get('Cookie')};
    console.log(this.cookieService.get('Cookie'))
    this.httpService.getUsuario(token).subscribe(
      (user) => {
        this.nombre = user.nombre, this.nombreUsuario = user.nombreUsuario, this.fotoUsuario = user.foto, this.apellidos = user.apellidos, this.correo = user.correo, this.fechaNacimiento = user.fechaNacimiento, this.genero = user.genero, this.introduccion = user.introduccion, this.localizacion = user.localizacion, this.pais = user.pais, this.password = user.password
      },
      (error: any) => {
        const sessionCookie = this.cookieService.get('Cookie');
        if (!sessionCookie) {
          this.router.navigateByUrl("/login");
        }
        console.log(error);
      }
    );

    this.httpService.getListaDegFavsUsuarioOrdenadas(token).subscribe(
      (degustacion) => {
        let i = 0;
        while(i < degustacion.length) {
          this.fotoDegustacion.push(degustacion[i].foto);
          this.nombreDegustacion.push(degustacion[i].nombre);
          this.degustacionG.push(degustacion[i]);
          i = i + 1;
      }
    });

  }

}
