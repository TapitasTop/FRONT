import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevaDegustacion',
  templateUrl: './nuevaDegustacion.component.html',
  styleUrls: ['./nuevaDegustacion.component.css']
})
export class NuevaDegustacionComponent implements OnInit {
  //Nota
  rating = 0;

  //Variables establecimiento
  nombreLocal = ""
  direccion = ""

  //Variables tapa
  nombreTapa = ""
  descripcion = ""
  foto = ""
  origen = ""
  tipoComida = ""
  calificadores = ""
  favorito = false

  //Subir foto
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  base64String = ''

  constructor(private httpService: AppService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const token = { token: this.cookieService.get('Cookie')};
  }

  //Funcion para subir una imagen
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
          this.base64String = e.target.result.replace("data:", "").replace(/^.+,/, "");
          console.log(this.base64String)
          this.foto = this.base64String
        };

        reader.readAsDataURL(this.currentFile);


      }
    }
  }

  guardarDegustacion(){
    let body = {
      calificacion: this.rating,
      degustacion: {
        calificadorGusto: this.calificadores,
        descripcion: this.descripcion,
        fechaAlta: "",
        foto: this.base64String,
        media: 0,
        nombre: this.nombreTapa,
        origen: this.origen,
        tipoComida: this.tipoComida
      },
      favorito: this.favorito,
      local: {
        direccion: this.direccion,
        nombre: this.nombreLocal
      },
      token: {
        token: this.cookieService.get('Cookie')
      }
    }
    console.log(body)

    this.httpService.aniadirDegustacion(body).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error);
      },
    })
  }
}
